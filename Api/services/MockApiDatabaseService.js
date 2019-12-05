const bcrypt = require('bcryptjs');

var MockApiDatabaseService = {
    GetUser: async function(email){
        password = bcrypt.hashSync("password")
        var user = {ID: 1,EMAIL: 'kyler.daybell96@gmail.com',PASSWORD:password, ROLE: 'user'}
        var DBresult = [user];  
        return DBresult;
    },
    RegisterUser: async function(user){
        
    },
    AddRecipe: async function(recipe){
        
    },
    GetRecipeID: async function(recipe){
       
    },
    GetIngredient:async function(ingredient){
        
    },
    AddIngredient: async function(ingredient){
        
    },
    GetIngredientID: async function(ingredient){
        
    },
    LinkIngredientToRecipe: async function(recipeID,IngredientID,Ingredient){
        
    },
    GetListOfIngredientsByRecipeID: async function(RecipeID){
        
    },
    GetRecipeByID: async function(RecipeID){
        
    },
    GetAllRecipes: async function(){
        
    },
    GetTopTenRecipes: async function(){
        
    },
    SearchRecipeByName: async function(RecipeName){
        
    },
    GetIngredientToRecipeByForeignKeys: async function(RecipeID,IngredientID){
        
    },
    DeleteRecipeToIngredientByRecipeID: async function(RecipeID){

    },
    DeleteRecipeByID: async function(RecipeID){

    },
    UpdateRecipe: async function(recipe){

    },
    SearchRecipeByIngredient: async function(IngredientName){

    },
    GetNumberOfIngredientsByRecipeId: async function(RecipeID){

    },
    SearchRecipeByCategory: async function(category){

    },
    SearchRecipeByEmail: async function(email){

    }
}

module.exports = MockApiDatabaseService;