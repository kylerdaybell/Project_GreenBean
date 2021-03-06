var express = require('express');
const fs = require('fs');
var cors = require('cors');
const https = require('https');
var app = express();
var whitelist = "http:/144.17.24.16";
var userController = require('./controllers/UserController.js');
var recipeController = require('./controllers/RecipeController.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb', type: 'application/json'}));
app.use('/images',express.static('Images'))
global.__basedir = __dirname;
const port = process.env.PORT || 80;

if(process.env.NODE_ENV === "development"){
  app.listen(port, () => {
    console.log("Development Server running on port "+port);
  });
}else {
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/api.greenbeancooking.com/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/api.greenbeancooking.com/cert.pem', 'utf8');
  const ca = fs.readFileSync('/etc/letsencrypt/live/api.greenbeancooking.com/chain.pem', 'utf8');

  const credentials = {
    key: privateKey,
    cert: certificate,
    ca: ca
  };

  const httpsServer = https.createServer(credentials, app);
  
  httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });
}


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

app.get('/gettoptenrecipes',cors(corsOptions),function(req,res){
  console.log("gettoptenrecipes");
  recipeController.GetTopTenRecipes(req,res);
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

app.get('/getrecipebycategory/:category',cors(corsOptions),function(req,res){
  console.log("/getrecipebycategory");
  recipeController.GetRecipeByCategory(req,res);
})

app.get('/getrecipebyemail/:email',cors(corsOptions),function(req,res){
  console.log("/getrecipebyemail");
  recipeController.GetRecipeByEmail(req,res);
})

app.post('/getRecipeAdvancedSearch',cors(corsOptions),function(req,res){
  console.log("/getRecipeAdvancedSearch");
  recipeController.GetRecipeAdvancedSearch(req,res);
})
