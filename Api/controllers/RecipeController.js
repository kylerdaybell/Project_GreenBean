var RecipeService = require('../services/RecipeService.js');
var UserService = require('../services/UserService.js');
var IngredientService = require('../services/IngredientService')
var ApiDatabaseService = require('../services/ApiDatabaseService.js');
var ImageService = require("../services/ImageService")
var Recipe = require('../models/RecipeModel.js');
var User = require('../models/UserModel.js');
var ImageService = require("../services/ImageService")

UserService.constructor(ApiDatabaseService);
IngredientService.constructor(ApiDatabaseService);
RecipeService.constructor(ApiDatabaseService, UserService,IngredientService);
//

var RecipeController = {
    PostCreateRecipe: async function(req, res){
        var ImageUrl = "https://api.greenbeancooking.com/images/DefaultImage.jpg";
        ImageUrl = await ImageService.Convert64BitToImageUrl(req.body.picture);
        var recipe = new Recipe(null, null, req.body.name, req.body.descr, ImageUrl, req.body.preptime, 
            req.body.cooktime, req.body.category,req.body.instructions, req.body.ingredientslist);
        var user = new User(req.body.email, req.body.password, null);
        if (await RecipeService.CreateRecipe(recipe, user)){
            res.write(JSON.stringify("Result: Success"));
            res.end();
        }
        else{
            res.write(JSON.stringify("Result: Failure"));
            res.end();
        }
    },
    GetRecipeById:async function(req,res){
        var RecipeID = req.params.id;
        var Recipe = await RecipeService.GetRecipeById(RecipeID);
        res.write(JSON.stringify(Recipe));
        res.end();
    },
    GetAllRecipes:async function(req,res){
        var RecipeList = await RecipeService.GetAllRecipes();
        res.write(JSON.stringify(RecipeList));
        res.end();
    },
    SearchRecipeByName: async function(req,res){
        var RecipeName = req.params.name;
        var RecipeList = await RecipeService.SearchRecipeByName(RecipeName);
        res.write(JSON.stringify(RecipeList));
        res.end();
    },
    UpdateRecipe: async function(req,res){
        var recipe = new Recipe(req.body.id, null, req.body.name, req.body.descr, req.body.picture, req.body.preptime, 
            req.body.cooktime, req.body.instructions, req.body.ingredientslist);
        var user = new User(req.body.email, req.body.password, null);
        if (await RecipeService.UpdateRecipe(recipe, user)){
            console.log(recipe)
            res.write(JSON.stringify("Result: Success"));
            res.end();
        }
        else{
            res.write(JSON.stringify("Result: Failure"));
            res.end();
        }
    },
    DeleteRecipe: async function(req,res){
        var recipe = new Recipe(req.body.id);
        var user = new User(req.body.email, req.body.password, null);
        if (await RecipeService.DeleteRecipe(recipe, user)){
            res.write(JSON.stringify("Result: Success"));
            res.end();
        }
        else{
            res.write(JSON.stringify("Result: Failure"));
            res.end();
        }
    },
    GetRecipeByIngredientsList: async function(req,res){
        IngredientsList = req.body.IngredientsList;
        var RecipeMatch = await RecipeService.SearchRecipesByIngredients(IngredientsList);
        res.write(JSON.stringify(RecipeMatch));
        res.end();
    }
}

module.exports = RecipeController;
