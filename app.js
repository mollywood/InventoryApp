const express = require('express')
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const pg = require('pg')
const app = express()
let models = require('./models')

app.engine('mustache',mustacheExpress())

app.set('views','./views')
app.set('view engine','mustache')

app.use(express.static(__dirname + '/views'))

app.use(bodyParser.urlencoded({ extended : false }))

// PUBLIC FACING SIDE
// Product Page
app.get('/productpage', function(req,res){
    //models.products.findAll().then(function(products){
        res.render('productpage')
    //})
})


// INVENTORY MGMT SIDE

// Display all products
app.get('/stockonhand', function(req,res){

    models.Products.findAll().then(function(Products){
        // res.json(shoppinglist)
        res.render('stockonhand', {list: Products})
    })
})


// Update Product Categories
app.get('/updatecategories', function(req,res){
    //models.products.findAll().then(function(products){
        res.render('updatecategories')
    //})
})

app.post('/updatecategories', function(req,res){

    const { productCategory , productGender } = req.body
    console.log(productCategory, productGender)
    let thisCategory = global.db.productcategories.build({
        productCategory : productCategory,
        productGender : productGender
    })

    thisCategory.save().then(function(savedCategory){
        console.log("Saved successful", savedCategory)
    })
    res.redirect('/updatecategories')
})

models.productcategories.findOne().then(function(productcategories){
    console.log(productcategories)
})


// Update Products
app.get('/updateproducts', function(req,res){
    //models.products.findAll().then(function(products){
        res.render('updateproducts')
    //})
})

app.post('/updateproducts', function(req,res){

    const { productCategory , productName , productSize , productPrice , productURL, productQuantity} = req.body
    console.log(productCategory, productName, productSize, productPrice, productURL, productQuantity)
    let thisProduct = global.db.Products.build({
        productName : productName,
        productSize : productSize,
        productPrice : productPrice,
        productURL : productURL,
        productQuantity: productQuantity
    })

    thisProduct.save().then(function(savedProduct){
        console.log("Saved successful", savedProduct)
    })
    res.redirect('/updateproducts')
})

models.Products.findOne().then(function(Products){
    console.log(Products)
})


// Stock On Hand
app.get('/stockonhand', function(req,res){
    //models.products.findAll().then(function(products){
        res.render('stockonhand')
    //})
})


// Contact Us
app.get('/contactus', function(req,res){
    //models.products.findAll().then(function(products){
        res.render('contactus')
    //})
})

app.post('/contactus', function(req,res){

    const { contactName, contactEmail, contactComment} = req.body
    console.log(contactName, contactEmail, contactComment)
    let thisComment = global.db.ContactUs.build({
        contactName : contactName,
        contactEmail : contactEmail,
        contactComment : contactComment
    })

    thisComment.save().then(function(savedComment){
        console.log("Saved successful", savedComment)
    })
    res.redirect('/contactus')
})

models.ContactUs.findOne().then(function(ContactUs){
    console.log(ContactUs)
})





// Server
app.listen(3000, () => console.log('I am listening on 3000!'))