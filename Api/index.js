var express = require('express');
const fs = require('fs');
var cors = require('cors');
var app = express();
const port = process.env.PORT || 80;
var whitelist = "http:/144.17.24.16";
var userController = require('./controllers/UserController.js');
var recipeController = require('./controllers/RecipeController.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.greenbeancooking.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/api.greenbeancooking.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/api.greenbeancooking.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};


const httpsServer = https.createServer(credentials, app);



var corsOptions={
    origin:function(origin,callback){
      if(whitelist.indexOf(origin)===-1){
        callback(null,true)
      }else{
        console.log("blocked by cors")
        callback(new Error('not allowed by cors'))
      }
    }
  }


//login area
app.post('/register',cors(corsOptions),function(req,res){
    console.log("register");
    userController.PostRegisterUser(req, res);
});

app.post('/login',cors(corsOptions),function(req,res){
  console.log("login");
  userController.PostLoginUser(req, res);
});

//recipe controller area
app.post('/createrecipe',cors(corsOptions),function(req,res){
  console.log("createrecipe");
  recipeController.PostCreateRecipe(req, res);
});

app.get('/getrecipebyid/:id',cors(corsOptions),function(req,res){
  console.log("getrecipebyid");
  recipeController.GetRecipeById(req,res);
});

app.get('/getallrecipes',cors(corsOptions),function(req,res){
  console.log("getallrecipes");
  recipeController.GetAllRecipes(req,res);
});

app.get('/searchrecipebyname/:name',cors(corsOptions),function(req,res){
  console.log("searchrecipebyname");
  recipeController.SearchRecipeByName(req,res);
});

app.post('/updaterecipe',cors(corsOptions),function(req,res){
  console.log("updaterecipe");
  recipeController.UpdateRecipe(req,res);
});

app.post('/deleterecipe',cors(corsOptions),function(req,res){
  console.log("deleterecipe");
  recipeController.DeleteRecipe(req,res);
})

app.post('/getrecipebyingredientslist',cors(corsOptions),function(req,res){
  console.log("/getrecipebyingredientslist");
  recipeController.GetRecipeByIngredientsList(req,res);
})



httpsServer.listen(443, () => {
	console.log('HTTPS Server running on port 443');
});
