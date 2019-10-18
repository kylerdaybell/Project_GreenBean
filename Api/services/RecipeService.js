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
                console.log(recipeID)
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
        recipeid = DatabaseResult[0][0]["ID"];
        if(typeof recipeid != 'undefined'){
            return recipeid;
        }else{
            return 0;
        }
    },
    AddIngredients: async function(recipe){
        console.log("now in adding ingredients")
        for(let i = 0; i<recipe.ingredientslist.length;i++){
            console.log("adding checking to see if"+recipe.ingredientslist[i].name)
            var DatabaseResult = await IApiDatabaseService.GetIngredient(recipe.ingredientslist[i].name);
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
