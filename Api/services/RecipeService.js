var IApiDatabaseService;
var User = require('../models/UserModel.js');
var Recipe = require('../models/RecipeModel.js');
var Ingredient = require('../models/IngredientModel.js')
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
    GetAllRecipes: async function(){
        let DatabaseResult = await IApiDatabaseService.GetAllRecipes();
        var RecipeList = []
        for(let i = 0; i<DatabaseResult[0].length; i++){
            let recipe = new Recipe(DatabaseResult[0][i]["ID"],DatabaseResult[0][i]["USER_ID"],DatabaseResult[0][i]["NAME"],DatabaseResult[0][i]["DESCRIPTION"],
                                    DatabaseResult[0][i]["PICTURE"],DatabaseResult[0][i]["PREP_TIME"],DatabaseResult[0][i]["COOK_TIME"],DatabaseResult[0][i]["INSTRUCTIONS"]);
            recipe.ingredientslist = await this.GetListOfIngredientsByRecipeID(recipe.id);
            RecipeList.push(recipe);
        }
        return RecipeList;
    },
    GetRecipeById: async function(RecipeID){
        let DatabaseResult = await IApiDatabaseService.GetRecipeByID(RecipeID);
        if(typeof DatabaseResult[0][0] != 'undefined'){
            var recipe = new Recipe(DatabaseResult[0][0]["ID"],DatabaseResult[0][0]["USER_ID"],DatabaseResult[0][0]["NAME"],DatabaseResult[0][0]["DESCRIPTION"],
                                    DatabaseResult[0][0]["PICTURE"],DatabaseResult[0][0]["PREP_TIME"],DatabaseResult[0][0]["COOK_TIME"],DatabaseResult[0][0]["INSTRUCTIONS"]);
            recipe.ingredientslist = await this.GetListOfIngredientsByRecipeID(RecipeID);
        }else{
            var recipe = new Recipe();
        }
        return recipe; 
    },
    GetListOfIngredientsByRecipeID: async function(recipeID){
        let DatabaseResult = await IApiDatabaseService.GetListOfIngredientsByRecipeID(recipeID);
        var IngredientsList = []; 
        if(typeof DatabaseResult[0][0] != 'undefined'){
            for(let i = 0; i < DatabaseResult[0].length; i++){
                var ingredient = new Ingredient(DatabaseResult[0][i]["NAME"],DatabaseResult[0][i]["AMOUNT"],DatabaseResult[0][i]["UNIT"]);
                IngredientsList.push(ingredient);
            }
        }else{
            var ingredient = new Ingredient();
        }
        return IngredientsList;
    },
    AddRecipe: async function(recipe){
        await IApiDatabaseService.AddRecipe(recipe);
        let DatabaseResult = await IApiDatabaseService.GetRecipeID(recipe);
        let recipeid = DatabaseResult[0][0]["ID"];
        if(typeof recipeid != 'undefined'){
            return recipeid; 
        }else{
            return 0;
        }
    },
    AddIngredients: async function(recipe){
        for(let i = 0; i<recipe.ingredientslist.length;i++){
            var DatabaseResult = await IApiDatabaseService.GetIngredient(recipe.ingredientslist[i].name);
            if(DatabaseResult[0][0].length == 0){              
                await this.AddAndLinkNewIngredient(recipe,i)
            }else{
                var IngredientID = DatabaseResult[0][0]["ID"];
                await this.LinkExistingIngredientToRecipe(recipe,IngredientID,recipe.ingredientslist[i]);

            }
        }
    },
    AddAndLinkNewIngredient: async function(recipe,IngredientID){
        await IApiDatabaseService.AddIngredient(recipe.ingredientslist[IngredientID].name);
        var DatabaseResult = await IApiDatabaseService.GetIngredientID(recipe.ingredientslist[IngredientID].name);
        if(DatabaseResult[0][0].length != 0){
            IngredientDatabaseID = DatabaseResult[0][0]["ID"]
            await IApiDatabaseService.LinkIngredientToRecipe(recipe.id,IngredientDatabaseID,recipe.ingredientslist[IngredientID]);
            return true;
        }else{
            return false;
        }
    },
    LinkExistingIngredientToRecipe: async function(recipe,IngredientDatabaseID,Ingredient){
        await IApiDatabaseService.LinkIngredientToRecipe(recipe.id,IngredientDatabaseID,Ingredient);
    }

}

module.exports = RecipeService;
