var IApiDatabaseService;
var User = require('../models/UserModel.js');
var Recipe = require('../models/RecipeModel.js');
var RecipeMatch = require('../models/RecipeMatchModel.js');
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
                if(await this.CheckDuplicate(recipe)){
                    var recipeID = await this.AddRecipe(recipe);
                    if(recipeID != 0){
                        recipe.id = recipeID;
                        await IIngredientService.AddIngredients(recipe);
                        return true;
                    }else{
                        return false
                    }
                }else{
                    return false;
                }
            }else{
                return false;
            }           
        }
        else{
            return false;
        }
    },
    GetTopTenRecipes: async function(){
        let DatabaseResult = await IApiDatabaseService.GetTopTenRecipes();
        var RecipeList = this.DatabaseResultToRecipeList(DatabaseResult)
        return RecipeList;
    },
    GetAllRecipes: async function(){
        let DatabaseResult = await IApiDatabaseService.GetAllRecipes();
        var RecipeList = this.DatabaseResultToRecipeList(DatabaseResult)
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
    GetRecipesByCategory: async function(category){
        let DatabaseResult = await IApiDatabaseService.SearchRecipeByCategory(category);
        var RecipeList = this.DatabaseResultToRecipeList(DatabaseResult)
        return RecipeList;
    },
    SearchRecipeByName: async function(RecipeName){
        let DatabaseResult = await IApiDatabaseService.SearchRecipeByName(RecipeName);
        var RecipeList = this.DatabaseResultToRecipeList(DatabaseResult)
        return RecipeList;
    },
    GetRecipesByEmail: async function(email){
        let DatabaseResult = await IApiDatabaseService.SearchRecipeByEmail(email);
        var RecipeList = this.DatabaseResultToRecipeList(DatabaseResult)
        return RecipeList;
    },
    SearchRecipesByIngredients: async function(IngredientsList){
        let ListOfAllMatchingRecipes = [];
        for(let i = 0;i < IngredientsList.length;i++){
            let Ingredient = IngredientsList[i]
            ListOfAllMatchingRecipes = await this.SearchRecipeBySingleIngredient(ListOfAllMatchingRecipes,Ingredient)
        }
        let RecipeAndMatchesDictionary = await this.MapRecipesToNumberOfIngredientMatches(ListOfAllMatchingRecipes)
        let RecipeByPercentMatch = await this.GetRecipesPercentMatch(RecipeAndMatchesDictionary);   
        let CompletedRecipeSearchList = await this.AssembleRecipeAndPercentMatch(RecipeByPercentMatch);
        return CompletedRecipeSearchList;

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
    CheckDuplicate: async function(recipe){
        let DatabaseResult = await IApiDatabaseService.GetRecipeByUsernameAndRecipename(recipe.name,recipe.userid);
        console.log("inside check duplicate");
        console.log(DatabaseResult);
        if(DatabaseResult[0][0]!= 'undefined'){
            console.log("that recipe was a duplicate")
        }
        return true;
    },
    SearchRecipeBySingleIngredient: async function(ListOfAllMatchingRecipes,Ingredient){ 
        let DatabaseResult = await IApiDatabaseService.SearchRecipeByIngredient(Ingredient.name);
            if(typeof DatabaseResult[0]!= 'undefined'){
                for(let j = 0; j<DatabaseResult[0].length; j++){
                    ListOfAllMatchingRecipes.push(DatabaseResult[0][j]["ID"]);
                }
            }
        return ListOfAllMatchingRecipes;
    },
    MapRecipesToNumberOfIngredientMatches: async function(ListOfAllMatchingRecipes){
        var RecipeAndMatchesDictionary = {}
        for(let i = 0;i<ListOfAllMatchingRecipes.length;i++){
            if(typeof RecipeAndMatchesDictionary[ListOfAllMatchingRecipes[i]] == 'undefined'){
                RecipeAndMatchesDictionary[ListOfAllMatchingRecipes[i]] = 1
            }else{
                RecipeAndMatchesDictionary[ListOfAllMatchingRecipes[i]] =  RecipeAndMatchesDictionary[ListOfAllMatchingRecipes[i]]+1
            }
        }
        return RecipeAndMatchesDictionary
    },
    AssembleRecipeAndPercentMatch: async function(RecipeByPercentMatch){
        let CompletedRecipeSearchList = []
        for(var key in RecipeByPercentMatch){
            let recipe = await this.GetRecipeById(key);
            let recipematch = new RecipeMatch(recipe,RecipeByPercentMatch[key]);
            CompletedRecipeSearchList.push(recipematch);
        }
        return CompletedRecipeSearchList;
    },
    GetRecipesPercentMatch: async function(RecipeAndMatchesDictionary){
        let RecipePercentMatchDictionary = {}
        for(var key in RecipeAndMatchesDictionary){
            let NumberOfTotalIngredients = await this.GetNumberOfIngredientsByRecipeId(key);
            let NumberOfMatchingIngredients = RecipeAndMatchesDictionary[key];
            let PercentMatch = (NumberOfMatchingIngredients/NumberOfTotalIngredients)*100
            RecipePercentMatchDictionary[key] = PercentMatch;
        }
        return RecipePercentMatchDictionary;
        
    },
    GetNumberOfIngredientsByRecipeId: async function(RecipeID){
        let DatabaseResult = await IApiDatabaseService.GetNumberOfIngredientsByRecipeId(RecipeID);
        if(typeof DatabaseResult[0][0] != 'undefined'){
            return DatabaseResult[0][0]["count(*)"]
        }else{
            return 0;
        }
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
    DatabaseResultToRecipeList: async function(DatabaseResultList){
        let RecipeList = []
        for(let i = 0; i<DatabaseResultList[0].length; i++){
            let recipe = await this.DatabaseResultToRecipe(DatabaseResultList[0][i]);
            var newrecipe = {"recipe":recipe};
            RecipeList.push(newrecipe);
        }
        return RecipeList;
    },
    DatabaseResultToRecipe: async function(DatabaseResult){
        let recipe = new Recipe(DatabaseResult["ID"],DatabaseResult["USER_ID"],DatabaseResult["NAME"],DatabaseResult["DESCRIPTION"],
        DatabaseResult["PICTURE"],DatabaseResult["PREP_TIME"],DatabaseResult["COOK_TIME"],DatabaseResult["CATEGORY"],DatabaseResult["INSTRUCTIONS"]);
        recipe.ingredientslist = await IIngredientService.GetListOfIngredientsByRecipeID(recipe.id);
        return recipe;
    }
}

module.exports = RecipeService;
