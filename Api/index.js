var express = require('express');
var cors = require('cors');
var app = express();
const port = process.env.PORT || 8080;
var whitelist = "http:/144.17.24.16";
var userController = require('./controllers/UserController.js')
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var corsOptions={
    origin:function(origin,callback){
      if(whitelist.indexOf(origin)===-1){
        callback(null,true)
      }else{
        callback(new Error('not allowed by cors'))
      }
    }
  }


app.post('/register',cors(corsOptions),function(req,res){
    userController.PostRegisterUser(req, res);
});

app.post('/login',cors(corsOptions),function(req,res){
  userController.PostLoginUser(req, res);
});


app.listen(port,function(){
  
});
