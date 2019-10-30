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
    SearchRecipesByIngredients: async function(IngredientsList){
        let ListOfAllMatchingRecipes = [];
        for(let i = 0;i < IngredientsList.length;i++){
            let Ingredient = IngredientsList[i]
            ListOfAllMatchingRecipes = await this.SearchRecipeBySingleIngredient(ListOfAllMatchingRecipes,Ingredient)
        }
        console.log(ListOfAllMatchingRecipes);
    },
    UpdateRecipe: async function(Recipe,User){
        if (await IUserService.LoginUser(User)){
            UserID = await IUserService.GetUserID(User)
            DatabaseResult = await IApiDatabaseService.GetRecipeByID(Recipe.id)
            if(typeof DatabaseResult[0][0] != 'undefined'){
                Recipe.userid = DatabaseResult[0][0]["USER_ID"];
                if(UserID == Recipe.userid){
                    await IApiDatabaseService.DeleteRecipeToIngredientByRecipeID(Recipe.id);
                    await IIngredientService.AddIngredients(Recipe);
                    await IApiDatabaseService.UpdateRecipe(Recipe);
                    return true;
                }
            }

        }
        return false;
    },
    AddRecipe: async function(recipe){
        let DatabaseResult = await IApiDatabaseService.GetRecipeID(recipe);
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
    SearchRecipeBySingleIngredient: async function(ListOfAllMatchingRecipes,Ingredient){ 
        let DatabaseResult = await IApiDatabaseService.SearchRecipeByIngredient(Ingredient.name);
            if(typeof DatabaseResult[0]!= 'undefined'){
                for(let j = 0; j<DatabaseResult[0].length; j++){
                    ListOfAllMatchingRecipes.push(DatabaseResult[0][j]);
                }
            }
        return ListOfAllMatchingRecipes;
    },
    DeleteRecipe: async function(Recipe,User){
        if (await IUserService.LoginUser(User)){
            UserID = await IUserService.GetUserID(User)
            DatabaseResult = await IApiDatabaseService.GetRecipeByID(Recipe.id)
            if(typeof DatabaseResult[0][0] != 'undefined'){
                Recipe.userid = DatabaseResult[0][0]["USER_ID"];
                if(UserID == Recipe.userid){
                    await IApiDatabaseService.DeleteRecipeToIngredientByRecipeID(Recipe.id);
                    await IApiDatabaseService.DeleteRecipeByID(Recipe.id);
                    return true;
                }
            }

        }
        return false;
    },
    DatabaseResultToRecipe: async function(DatabaseResult){
        let recipe = new Recipe(DatabaseResult["ID"],DatabaseResult["USER_ID"],DatabaseResult["NAME"],DatabaseResult["DESCRIPTION"],
        DatabaseResult["PICTURE"],DatabaseResult["PREP_TIME"],DatabaseResult["COOK_TIME"],DatabaseResult["INSTRUCTIONS"]);
        recipe.ingredientslist = await IIngredientService.GetListOfIngredientsByRecipeID(recipe.id);
        return recipe;
    }
}

module.exports = RecipeService;
