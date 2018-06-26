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


// Update Product Categories
app.get('/updatecategories', function(req,res){
    //models.products.findAll().then(function(products){
        res.render('updatecategories')
    //})
})

app.get('/updateproducts', function(req,res){
    //models.products.findAll().then(function(products){
        res.render('updateproducts')
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



// Server
app.listen(3000, () => console.log('I am listening on 3000!'))