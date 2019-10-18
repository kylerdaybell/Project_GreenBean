var IApiDatabaseService;
var User = require('../models/UserModel.js');
var Recipe = require('../models/RecipeModel.js');
var IUserService;

var RecipeService = {
    constructor: function(IApiDatabaseServiceInsert, IUserServiceInsert){
        IApiDatabaseService = IApiDatabaseServiceInsert;
        IUserService = IUserServiceInsert;
    },
    CreateRecipe: async function(recipe, user){
        if (await IUserService.LoginUser(user)){
            recipe.userid = await IUserService.GetUserID(user);
            if(recipe.userid !=0){
                var recipeID = await this.AddRecipe(recipe);
                if(recipeID != 0){
                    recipe.id = recipeID;
                    await this.AddIngredients(recipe);
                }else{
                    return false
                }
                return true;
            }else{
                return false;
            }           
        }
        else{
            return false;
        }
    },
    AddRecipe: async function(recipe){
        await IApiDatabaseService.AddRecipe(recipe);
        var DatabaseResult = await IApiDatabaseService.GetRecipeID(recipe);
        if(typeof DatabaseResult[0]["ID"] != 'undefined'){
            return DatabaseResult[0]["ID"];
        }else{
            return 0;
        }
    },
    AddIngredients: async function(recipe){
        for(let i = 0; i<recipe.ingredientslist.length;i++){
            var DatabaseResult = IApiDatabaseService.GetIngredient(recipe.ingredientslist[i]);
            if(typeof DatabaseResult[0]["NAME"] == 'undefined'){
                await this.AddAndLinkNewIngredient()
            }
        }
    },
    AddAndLinkNewIngredient: async function(recipe,IngredientID,Ingredient){
        await IApiDatabaseService.AddIngredient(recipe.ingredientslist[IngredientID]);
        var DatabaseResult = await IApiDatabaseService.GetIngredientID(recipe.ingredientslist[IngredientID]);
        if(typeof DatabaseResult[0]["ID"] != 'undefined'){
            IngredientDatabaseID = DatabaseResult[0]["ID"]
            await IApiDatabaseService.LinkIngredientToRecipe(recipe.id,IngredientDatabaseID,Ingredient);
            return true;
        }else{
            return false;
        }
    }

}

module.exports = RecipeService;
