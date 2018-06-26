const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mustacheExpress = require('mustache-express')
const bcrypt = require('bcrypt')

var session = require('express-session')

let models = require('./models')

app.use(express.static('public'))

app.engine('mustache',mustacheExpress())
app.use(bodyParser.urlencoded({extended :false}))

app.set('views','./views')
app.set('view engine','mustache')

app.use(session({
  secret: "cat",  //random secret hash
  resave: false,
  saveUninitialized: false
}))

// SIGN UP //

app.get('/signIn', function(req,res){
    res.render('signin')
  })

app.post('/signUp', function(req, res){
  bcrypt.hash(req.body.password, 10, function(err, hash) {
      let newUser = {
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        email : req.body.email,
        address : req.body.address,
        username : req.body.username,
        password : hash
  }

  models.User.create(newUser).then(function(){
    res.redirect('/signIn')
    })
  })
})

// SIGN IN //

app.post('/signIn',function(req,res,next){

  models.User.findOne( {where: {username : req.body.usernameSI}}).then(function(user) {
    bcrypt.compare(req.body.passwordSI, user.password, function(err,result) {
      if(result) {
        if(req.session) {
        req.session.username = req.body.usernameSI
        var hour = 1800000
        req.session.cookie.expires = new Date(Date.now() + hour)
        req.session.cookie.maxAge = hour
        }
        res.redirect('/shop')
      } else {
        res.redirect('/errorSignIn')
      }
  })
})
})

// RENDER SIGN IN SUCCESS //
app.get('/shop', function(req,res) {
  res.render('shop')
})

// SIGN OUT //
app.post('/logOut', function(req, res){
  req.session.destroy()
  res.clearCookie('connect.sid', {path : '/'});
  res.redirect('/signin')
})

// RENDER SIGN IN ERROR //
app.get('/errorSignIn', function(req,res) {
  res.render('errorSignIn')
})

// ADMIN //

//SIGN UP//

app.get('/admin', function(req,res){
    res.render('admin')
  })

app.post('/adminSignUp', function(req, res){
  bcrypt.hash(req.body.adminPassword, 10, function(err, hash) {
      let newAdmin = {
        username : req.body.adminUsername,
        password : hash
  }

  models.Admin.create(newAdmin).then(function(){
    res.redirect('/admin')
    })
  })
})

//SIGN IN //
app.post('/adminSignIn',function(req,res,next){

  models.Admin.findOne({username : req.body.adminUsernameSI}).then(function(user) {
    bcrypt.compare(req.body.adminPasswordSI, user.password, function(err,result) {
      if(result) {
        res.redirect('/shop')
      } else {
        res.redirect('/errorSignIn')
      }
  })
})
})

// SIGN OUT //
// app.post('/logOut', function(req, res){
//   req.session.destroy()
//   res.clearCookie('connect.sid', {path : '/'});
//   res.redirect('/signin')
// })

app.listen(3000, () => console.log('Example app listening on port 3000!'))
