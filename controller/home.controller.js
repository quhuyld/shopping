const Product = require('../model/product.model')
const Category = require('../model/category.model')
const User = require('../model/user.model')
const Order = require('../model/order.model')
module.exports.index = async (req, res)=>{
    var latestPros = await Product.find({}).sort({"date":"desc"}).limit(10)
    var topsellers = await Product.find({}).sort({"sold":"desc"}).limit(3)
    var topnew = await Product.find({}).sort({"date":"desc"}).limit(3)
    var cats = await Category.find({})
    var cart = req.cookies.cart
    res.render('index', {layout: './layout/common', latestPros: latestPros, topsellers:topsellers, topnew:topnew, cats: cats, cart:cart})
}
module.exports.productDetail = async (req, res)=>{
    var pro = await Product.findOne({_id:req.query.id})
    var cats = await Category.find({})
    var cart = req.cookies.cart
    res.render('product-detail', {layout: './layout/common', pro: pro, cats: cats, cart:cart})
}
module.exports.productByCat = async (req, res)=>{
    var cat = await Category.findOne({_id: req.query.id})
    var pros = await Product.find({category:cat})
    var cats = await Category.find({})
    var cart = req.cookies.cart
    res.render('product-by-category', {layout: './layout/common', pros: pros, cats: cats, cat:cat, cart:cart})
}
module.exports.cart = async (req, res)=>{
    var cats = await Category.find({})
    var cart = req.cookies.cart
    res.render('cart', {layout: './layout/common', cats: cats, cart:cart})
}
module.exports.removeCartItem = async (req, res)=>{
    var cart = req.cookies.cart
    cart.list.splice(req.query.index, 1)
    var total = 0
    cart.list.forEach(item=>{
        total+= item.product.product.price*((100-product.discount)/100)*item.qty
    })
    cart.total = total
    res.cookie("cart", {...cart})
    res.redirect("/cart")
}
module.exports.addtocart = async (req, res)=>{
    var id = req.query.id
    var quantity = req.query.quantity
    var product = await Product.findOne({_id:id})
    if(!req.cookies.cart){
        res.cookie("cart", {list:[{product: product, qty: quantity}], total: product.price*((100-product.discount)/100)*quantity})
    }
    else if (req.cookies.cart.list.length==0){
        var c = {list:[{product: product, qty: quantity}], total: product.price*((100-product.discount)/100)*quantity}
        res.cookie("cart", {...c})
    }
    else{
        var cart = req.cookies.cart
        var ok = false
        cart.list.forEach(item=>{
            if(item.product._id==id){
                item.qty = parseInt(item.qty) + parseInt(quantity)
                cart.total = parseInt(cart.total) + product.price*((100-product.discount)/100)*quantity
                ok = true
                return
            }
        })
        if(!ok){
            cart.list.push({product: product, qty: quantity})
            cart.total = parseInt(cart.total) + product.price*((100-product.discount)/100)*quantity
        }
        res.cookie("cart", {...cart})
    }
    console.log(cart)
    res.redirect("/cart")
}
module.exports.checkout = async (req, res)=>{
    var cart = req.cookies.cart
    var now = new Date()
    var user = await User.findOne({_id: req.cookies.userId})
    var neworder = new Order({
        date: now,
        customer: {...user},
        total: cart.total,
        details: [...cart.list]
    })
    cart = {list:[], total:0}
    neworder.save((err, order)=>{
        if(err){
            console.log(err)
            return
        }
        console.log(order)
    })
    res.cookie("cart", {...cart})
    var cats = await Category.find({})
    res.render('cart', {layout: './layout/common', cats: cats, cart:cart, message: "Checkout success!"})
}
module.exports.login = async (req, res)=>{
    res.render('login', {layout: './layout/comon-none'})
}
module.exports.postLogin = async (req, res)=>{
    var user = await User.findOne({username: req.body.username})
    if (!user){
        res.render('login', {layout: './layout/comon-none', message: 'Wrong Username or Password'})
        return
    }
    if(user.password!==req.body.password){
        res.render('login', {layout: './layout/comon-none', message: 'Wrong Username or Password'})
        return
    }
    res.cookie('userId', user.id)
    if(user.permission.name==="CUSTOMER"){
        res.redirect('/')
    }
    else{
        res.redirect('/admin/pro')
    }
}
module.exports.requireAuth = async (req, res, next)=>{
    if (!req.cookies.userId){
        res.redirect('/login')
        return
    }
    var user = await User.findOne({_id:req.cookies.userId})
    if (!user){
        res.redirect('/login')
        return
    }
    res.locals.user = user
    next()
}
module.exports.logout = (req, res)=>{
    res.clearCookie('userId')
    res.redirect('/login')
}
module.exports.checkCUS = async (req, res, next)=>{
    var user = await User.findOne({_id: req.cookies.userId})
    if(user.permission.name!=="CUSTOMER"){
        res.status(400).send()
        return
    }
    next()
}
