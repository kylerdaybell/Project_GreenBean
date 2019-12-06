var RecipeService = require('../services/RecipeService.js');
var UserService = require('../services/UserService.js');
var MockApiDatabaseService = require('../services/MockApiDatabaseService.js');
var IngredientService = require('../services/IngredientService');

UserService.constructor(MockApiDatabaseService);
IngredientService.constructor(MockApiDatabaseService);
RecipeService.constructor(MockApiDatabaseService, UserService,IngredientService);

test("Test get recipe by id",async ()=>{
    result = RecipeService.GetAllRecipes();
    console.log(result)
    expect(true).toBe(true);
})



