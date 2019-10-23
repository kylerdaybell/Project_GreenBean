var IApiDatabaseService;
var User = require('../models/UserModel.js');
var Recipe = require('../models/RecipeModel.js');
var Ingredient = require('../models/IngredientModel.js')
var IIngredientService;
var IUserService;

var RecipeService = {
    constructor: function(IApiDatabaseServiceInsert, IUserServiceInsert,IIngredientServiceInsert){
        IIngredientServiceInsert = IIngredientServiceInsert;
        IApiDatabaseService = IApiDatabaseServiceInsert;
        IUserService = IUserServiceInsert;
    },
    CreateRecipe: async function(recipe, user){
        if (await IUserService.LoginUser(user)){
            recipe.userid = await IUserService.GetUserID(user);
            if(recipe.userid != 0){
                var recipeID = await this.AddRecipe(recipe);
                if(recipeID != 0){
                    recipe.id = recipeID;
                    await IIngredientService.AddIngredients(recipe);
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
            let recipe = await this.DatabaseResultToRecipe(DatabaseResult);
            RecipeList.push(recipe);
        }
        return RecipeList;
    },
    GetRecipeById: async function(RecipeID){
        let DatabaseResult = await IApiDatabaseService.GetRecipeByID(RecipeID);
        if(typeof DatabaseResult[0][0] != 'undefined'){
            var recipe = await this.DatabaseResultToRecipe(DatabaseResult);
        }else{
            var recipe = new Recipe();
        }
        return recipe; 
    },
    SearchRecipeByName: async function(RecipeName){
        let DatabaseResult = await IApiDatabaseService.SearchRecipeByName(RecipeName);
        var RecipeList = []
        for(let i = 0; i<DatabaseResult[0].length; i++){
            let recipe = await this.DatabaseResultToRecipe(DatabaseResult);
            RecipeList.push(recipe);
        }
        return RecipeList;
    },
    UpdateRecipe: async function(Recipe,User){
        if (await IUserService.LoginUser(User)){
            UserID = await IUserService.GetUserID(User)
            DatabaseResult = await IApiDatabaseService.GetRecipeByID(Recipe.id)
            if(typeof DatabaseResult[0][0] != 'undefined'){
                Recipe.id =DatabaseResult[0][0]["USER_ID"];
                if(UserID == Recipe.id){
                    await IApiDatabaseService.DeleteRecipeToIngredientByRecipeID(Recipe.id);
                    await IIngredientService.AddIngredients(Recipe);
                    await IApiDatabaseService.UpdateRecipe(Recipe);
                }
            }

        }
        await IApiDatabaseService.DeleteRecipeToIngredientByRecipeID(Recipe.id);
        await IApiDatabaseService.UpdateRecipe(Recipe)
    },
    AddRecipe: async function(recipe){
        let DatabaseResult = await IApiDatabaseService.GetRecipeID(recipe);
        console.log(DatabaseResult[0])
        if(typeof DatabaseResult[0][0] != "undefined"){
            return DatabaseResult[0][0]["ID"];
        }else{
            await IApiDatabaseService.AddRecipe(recipe);
            DatabaseResult = await IApiDatabaseService.GetRecipeID(recipe);
            let recipeid = DatabaseResult[0][0]["ID"];
            if(typeof recipeid != 'undefined'){
                return recipeid; 
            }else{
                return 0;
            }
        }
    },
    DatabaseResultToRecipe: async function(DatabaseResult){
        let recipe = new Recipe(DatabaseResult[0][i]["ID"],DatabaseResult[0][i]["USER_ID"],DatabaseResult[0][i]["NAME"],DatabaseResult[0][i]["DESCRIPTION"],
        DatabaseResult[0][i]["PICTURE"],DatabaseResult[0][i]["PREP_TIME"],DatabaseResult[0][i]["COOK_TIME"],DatabaseResult[0][i]["INSTRUCTIONS"]);
        recipe.ingredientslist = await IIngredientService.GetListOfIngredientsByRecipeID(recipe.id);
        return recipe;
    }
}

module.exports = RecipeService;
