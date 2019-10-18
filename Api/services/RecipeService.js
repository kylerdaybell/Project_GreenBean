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
        console.log(recipe);
        if (await IUserService.LoginUser(user)){
            console.log("the user was logged in")
            recipe.userid = await IUserService.GetUserID(user);
            if(recipe.userid !=0){
                console.log("the user id was not zero")
                var recipeID = await this.AddRecipe(recipe);
                if(recipeID != 0){
                    console.log("the recipe was added")
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
        console.log("now in adding ingredients")
        for(let i = 0; i<recipe.ingredientslist.length;i++){
            console.log("adding "+recipe.ingredientslist[i].name)
            var DatabaseResult = IApiDatabaseService.GetIngredient(recipe.ingredientslist[i].name);
            if(typeof DatabaseResult[0]["NAME"] == 'undefined'){
                await this.AddAndLinkNewIngredient(recipe,i)
            }
        }
    },
    AddAndLinkNewIngredient: async function(recipe,IngredientID){
        await IApiDatabaseService.AddIngredient(recipe.ingredientslist[IngredientID]);
        var DatabaseResult = await IApiDatabaseService.GetIngredientID(recipe.ingredientslist[IngredientID].name);
        if(typeof DatabaseResult[0]["ID"] != 'undefined'){
            IngredientDatabaseID = DatabaseResult[0]["ID"]
            await IApiDatabaseService.LinkIngredientToRecipe(recipe.id,IngredientDatabaseID,recipe.ingredientslist[i]);
            return true;
        }else{
            return false;
        }
    }

}

module.exports = RecipeService;
