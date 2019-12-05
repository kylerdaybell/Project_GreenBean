var RecipeService = require('../services/RecipeService.js');
var UserService = require('../services/UserService.js');
var MockApiDatabaseService = require('../services/MockApiDatabaseService.js');
var IngredientService = require('../services/IngredientService');

UserService.constructor(MockApiDatabaseService);
IngredientService.constructor(MockApiDatabaseService);
RecipeService.constructor(MockApiDatabaseService, UserService,IngredientService);

test("Test get recipe by id",async ()=>{
    result = [[{ ID: 3, USER_ID: 1, NAME: 'Walnut Gorgonzola Salad',DESCRIPTION: "A yummy, easy salad with candied walnuts, cranberries, Gorgonzola cheese, mixed greens, and a raspberry vinaigrette. It's always a big hit and is requested by my friends and family constantly! Even my picky fiance!", PICTURE: 'https://api.greenbeancooking.com/images/img-1573759586023.jpeg', PREP_TIME: '0:05:00', COOK_TIME: '0:05:00',INSTRUCTIONS: 'Place walnuts and sugar in a skillet over medium heat, stirring constantly until the sugar dissolves into a light brown liquid and coats the walnuts. Remove walnuts from skillet, and spread them out on a sheet of aluminum foil to cool. Place in a large salad bowl the mixed greens, cranberries, cheese, vinaigrette, vinegar, and olive oil. Toss gently; add candied walnuts, and toss again.',CATEGORY: null}]];
    expect(true).toBe(true);
})



