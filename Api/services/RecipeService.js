var IApiDatabaseService;
var User = require('../models/UserModel.js');
var Recipe = require('../models/RecipeModel.js');
var IIngredientService;
var IUserService;

var RecipeService = {
    constructor: function(IApiDatabaseServiceInsert, IUserServiceInsert,IIngredientServiceInsert){
        IIngredientService = IIngredientServiceInsert;
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
            let recipe = await this.DatabaseResultToRecipe(DatabaseResult[0][i]);
            RecipeList.push(recipe);
        }
        return RecipeList;
    },
    GetRecipeById: async function(RecipeID){
        let DatabaseResult = await IApiDatabaseService.GetRecipeByID(RecipeID);
        if(typeof DatabaseResult[0][0] != 'undefined'){
            var recipe = await this.DatabaseResultToRecipe(DatabaseResult[0][0]);
        }else{
            var recipe = new Recipe();
        }
        return recipe; 
    },
    SearchRecipeByName: async function(RecipeName){
        let DatabaseResult = await IApiDatabaseService.SearchRecipeByName(RecipeName);
        var RecipeList = []
        for(let i = 0; i<DatabaseResult[0].length; i++){
            let recipe = await this.DatabaseResultToRecipe(DatabaseResult[0][i]);
            RecipeList.push(recipe);
        }
        return RecipeList;
    },
    UpdateRecipe: async function(Recipe,User){
        if (await IUserService.LoginUser(User)){
            UserID = await IUserService.GetUserID(User)
            console.log(UserId);
            DatabaseResult = await IApiDatabaseService.GetRecipeByID(Recipe.id)
            if(typeof DatabaseResult[0][0] != 'undefined'){
                Recipe.id = DatabaseResult[0][0]["USER_ID"];
                if(UserID == Recipe.id){
                    console.log("the user owns this recipe")
                    await IApiDatabaseService.DeleteRecipeToIngredientByRecipeID(Recipe.id);
                    await IIngredientService.AddIngredients(Recipe);
                    await IApiDatabaseService.UpdateRecipe(Recipe);
                    return true;
                }
            }

        }
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
        let recipe = new Recipe(DatabaseResult["ID"],DatabaseResult["USER_ID"],DatabaseResult["NAME"],DatabaseResult["DESCRIPTION"],
        DatabaseResult["PICTURE"],DatabaseResult["PREP_TIME"],DatabaseResult["COOK_TIME"],DatabaseResult["INSTRUCTIONS"]);
        recipe.ingredientslist = await IIngredientService.GetListOfIngredientsByRecipeID(recipe.id);
        return recipe;
    }
}

module.exports = RecipeService;
