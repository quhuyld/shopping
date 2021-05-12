const Product = require('../../model/product.model')
const Category = require('../../model/category.model')
const User = require('../../model/user.model')
const Permission = require('../../model/permission.model')
const Order = require('../../model/order.model')
module.exports.index = async (req, res)=>{
    var pros = await Product.find({}).sort({"date":"desc"})
    res.render("admin/product-list", {layout: './layout/comon-none', pros: pros})
}
module.exports.cat = async (req, res)=>{
    var cats = await Category.find({})
    res.render("admin/category-list", {layout: './layout/comon-none', cats: cats})
}
module.exports.user = async (req, res)=>{
    var users = await User.find({})
    res.render("admin/user-list", {layout: './layout/comon-none', users: users})
}
module.exports.addPro = async (req, res)=>{
    var cats = await Category.find({})
    res.render("admin/add-product", {layout: './layout/comon-none', cats: cats})
}
module.exports.addCat = async (req, res)=>{
    res.render("admin/add-cat", {layout: './layout/comon-none'})
}
module.exports.postAddCat = async (req, res)=>{
    var newcat = new Category({
        name: req.body.name
    })
    newcat.save((err, cat)=>{
        if(err){
            console.log(err)
            return
        }
        console.log(cat)
        res.redirect("/admin/cat")
    })
}
module.exports.editPro = async (req, res)=>{
    var cats = await Category.find({})
    var pro = await Product.findOne({_id: req.query.id})
    res.render("admin/edit-product", {layout: './layout/comon-none', cats: cats, pro: pro})
}
module.exports.editCat = async (req, res)=>{
    var cat = await Category.findOne({_id: req.query.id})
    res.render("admin/edit-cat", {layout: './layout/comon-none', cat: cat})
}
module.exports.addUser = async (req, res)=>{
    var pers = await Permission.find({})
    res.render("admin/add-user", {layout: './layout/comon-none', pers: pers})
}
module.exports.editUser = async (req, res)=>{
    var pers = await Permission.find({})
    var user = await User.findOne({_id: req.query.id})
    res.render("admin/edit-user", {layout: './layout/comon-none', user: user, pers: pers})
}
module.exports.postEditCat = async (req, res)=>{
    Category.findOne({_id: req.body.id}, (err, cat)=>{
        cat.name = req.body.name
        cat.save((err, cat)=>{
            if(err){
                console.log(err)
                return
            }
            console.log(cat)
        })
        res.redirect("/admin/cat")
    })
}
module.exports.postAddPro = async (req, res)=>{
    var now = new Date()
    var cat = await Category.findOne({_id: req.body.cat})
    var newPro = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.desc,
        qty: req.body.qty,
        sold: 0,
        image: "/"+req.file.path,
        discount: req.body.discount,
        date: now,
        category: {...cat}
    })
    newPro.save((err, pro)=>{
        if(err){
            console.log(err)
            return
        }
        console.log(pro)
    })
    res.redirect("/admin/pro")
}
module.exports.postEditPro = async (req, res)=>{
    var cat = await Category.findOne({_id: req.body.cat})
    Product.findOne({_id: req.body.id}, (err, pro)=>{
        pro.name = req.body.name
        pro.discount = req.body.discount
        pro.price = req.body.price
        pro.description = req.body.desc
        pro.qty = req.body.qty
        pro.image = "/"+req.file.path
        pro.category = {...cat}
        pro.save((err, pro)=>{
            if(err){
                console.log(err)
                return
            }
            console.log(pro)
        })
        res.redirect("/admin/pro")
    })
}
module.exports.postEditUser = async (req, res)=>{
    var permission = await Permission.findOne({_id: req.body.per})
    console.log(permission)
    User.findOne({_id: req.body.id}, (err, user)=>{
        user.username = req.body.username
        user.fullname = req.body.fullname
        user.address = req.body.address
        user.phone = req.body.phone
        user.permission = {...permission}
        user.save((err, user)=>{
            if(err){
                console.log(err)
                return
            }
            console.log(user)
        })
        res.redirect("/admin/user")
    })
}
module.exports.postAddUser = async (req, res)=>{
    var permission = await Permission.findOne({_id: req.body.per})
    var newuser = new User({
        username : req.body.username,
        fullname : req.body.fullname,
        address : req.body.address,
        phone : req.body.phone,
        permission: {...permission},
        password: req.body.password
    })
    newuser.save((err, user)=>{
        if(err){
            console.log(err)
            return
        }
        console.log(user)
    })
    res.redirect("/admin/user")
}
module.exports.delete = async (req, res)=>{
    await Product.deleteOne({_id: req.query.id})
    res.redirect("/admin/pro")
}
module.exports.deleteCat = async (req, res)=>{
    await Category.deleteOne({_id: req.query.id})
    res.redirect("/admin/cat")
}
module.exports.deleteUser = async (req, res)=>{
    await User.deleteOne({_id: req.query.id})
    res.redirect("/admin/user")
}
module.exports.order = async (req, res)=>{
    var orders = await Order.find({})
    res.render("admin/order-list", {layout: './layout/comon-none', orders:orders})
}
module.exports.orderDetails = async (req, res)=>{
    var order = await Order.findOne({_id: req.query.id})
    res.render("admin/order-details", {layout: './layout/comon-none', order:order})
}
module.exports.checkAdmin = async (req, res, next)=>{
    var user = await User.findOne({_id: req.cookies.userId})
    if(user.permission.name!=="ADMIN"){
        res.status(400).send()
        return
    }
    next()
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