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
        result = [[{ ID: 3, USER_ID: 1, NAME: 'Walnut Gorgonzola Salad',DESCRIPTION: "A yummy, easy salad with candied walnuts, cranberries, Gorgonzola cheese, mixed greens, and a raspberry vinaigrette. It's always a big hit and is requested by my friends and family constantly! Even my picky fiance!", PICTURE: 'https://api.greenbeancooking.com/images/img-1573759586023.jpeg', PREP_TIME: '0:05:00', COOK_TIME: '0:05:00',INSTRUCTIONS: 'Place walnuts and sugar in a skillet over medium heat, stirring constantly until the sugar dissolves into a light brown liquid and coats the walnuts. Remove walnuts from skillet, and spread them out on a sheet of aluminum foil to cool. Place in a large salad bowl the mixed greens, cranberries, cheese, vinaigrette, vinegar, and olive oil. Toss gently; add candied walnuts, and toss again.',CATEGORY: null}]];
        return result;
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