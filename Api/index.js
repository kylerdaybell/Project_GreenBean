var express = require('express');
var cors = require('cors');
var app = express();
const port = process.env.PORT || 80;
var whitelist = "http:/144.17.24.16";
var userController = require('./controllers/UserController.js');
var recipeController = require('./controllers/RecipeController.js');
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


//login area
app.post('/register',cors(corsOptions),function(req,res){
    userController.PostRegisterUser(req, res);
});

app.post('/login',cors(corsOptions),function(req,res){
  userController.PostLoginUser(req, res);
});

//recipe controller area
app.post('/createrecipe',cors(corsOptions),function(req,res){
  recipeController.PostCreateRecipe(req, res);
});

app.get('/getrecipebyid/:id',cors(corsOptions),function(req,res){
  recipeController.GetRecipeById(req,res);
});

app.get('/getallrecipes',cors(corsOptions),function(req,res){
  recipeController.GetAllRecipes(req,res);
})

app.get('/searchrecipebyname/:name',cors(corsOptions),function(req,res){
  recipeController.SearchRecipeByName(req,res);
})

app.listen(port,function(){

});
