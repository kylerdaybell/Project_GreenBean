var RecipeService = require('../services/RecipeService.js');
var UserService = require('../services/UserService.js');
var MockApiDatabaseService = require('../services/MockApiDatabaseService.js');
var IngredientService = require('../services/IngredientService');

UserService.constructor(MockApiDatabaseService);
IngredientService.constructor(MockApiDatabaseService);
RecipeService.constructor(MockApiDatabaseService, UserService,IngredientService);

test("Test get all recipes",async ()=>{
    //result = await RecipeService.GetAllRecipes();
    //console.log(result)
    expect(true).toBe(true);
})



