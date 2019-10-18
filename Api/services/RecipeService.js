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
                    console.log("adding ingredients");
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
            var DatabaseResult = await IApiDatabaseService.GetIngredient(recipe.ingredientslist[i].name);
            if(DatabaseResult[0].length == 0){
                
                await this.AddAndLinkNewIngredient(recipe,i)
            }
        }
    },
    AddAndLinkNewIngredient: async function(recipe,IngredientID){
        await IApiDatabaseService.AddIngredient(recipe.ingredientslist[IngredientID]);
        var DatabaseResult = await IApiDatabaseService.GetIngredientID(recipe.ingredientslist[IngredientID]);
        console.log(DatabaseResult[0][0]);
        if(DatabaseResult[0][0].length != 0){
            IngredientDatabaseID = DatabaseResult[0][0]["ID"]
            console.log(IngredientDatabaseID)
            console.log(recipe.ingredientslist[IngredientID])
            await IApiDatabaseService.LinkIngredientToRecipe(recipe.id,IngredientDatabaseID,recipe.ingredientslist[IngredientID]);
            return true;
        }else{
            return false;
        }
    }

}

module.exports = RecipeService;
