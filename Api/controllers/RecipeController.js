var RecipeService = require('../services/RecipeService.js');
var ApiDatabaseService = require('../services/ApiDatabaseService.js');
var Recipe = require('../models/RecipeModel.js');
var User = require('../models/UserModel.js');

UserService.constructor(ApiDatabaseService);
RecipeService.constructor(ApiDatabaseService, UserService);

var RecipeController = {
    PostCreateRecipe: async function(req, res){
        var recipe = new Recipe(null, null, req.body.name, req.body.descr, req.body.picture, req.body.preptime, 
            req.body.cooktime, req.body.instructions, req.body.ingredientslist);
        var user = new User(req.body.email, req.body.password, null);
        if (RecipeService.CreateRecipe(recipe, user)){
            res.write(JSON.stringify("Result: Success"));
            res.end();
        }
        else{
            res.write(JSON.stringify("Result: Failure"));
            res.end();
        }
    }

}

module.exports = RecipeController;
