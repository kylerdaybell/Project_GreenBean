var IApiDatabaseService;
var Ingredient = require('../models/IngredientModel.js')

var IngredientService = {
    constructor: function(IApiDatabaseServiceInsert){
        IApiDatabaseService = IApiDatabaseServiceInsert;
    },
    AddIngredients: async function(recipe){
        for(let i = 0; i<recipe.ingredientslist.length;i++){
            let DatabaseResult = await IApiDatabaseService.GetIngredient(recipe.ingredientslist[i].name);
            if(DatabaseResult[0].length == 0){              
                await this.AddAndLinkNewIngredient(recipe,i)
            }else{
                var IngredientID = DatabaseResult[0][0]["ID"];
                await this.LinkExistingIngredientToRecipe(recipe,IngredientID,recipe.ingredientslist[i]);

            }
        }
    },
    AddAndLinkNewIngredient: async function(recipe,IngredientID){
        await IApiDatabaseService.AddIngredient(recipe.ingredientslist[IngredientID].name);
        let DatabaseResult = await IApiDatabaseService.GetIngredientID(recipe.ingredientslist[IngredientID].name);
        if(DatabaseResult[0][0].length != 0){
            IngredientDatabaseID = DatabaseResult[0][0]["ID"]
            await IApiDatabaseService.LinkIngredientToRecipe(recipe.id,IngredientDatabaseID,recipe.ingredientslist[IngredientID]);
            return true;
        }else{
            return false;
        }
    },
    LinkExistingIngredientToRecipe: async function(recipe,IngredientDatabaseID,Ingredient){
        let DatabaseResult = await IApiDatabaseService.GetIngredientToRecipeByForeignKeys(IngredientDatabaseID,recipe.id);
        if(typeof DatabaseResult[0][0] == 'undefined'){
            await IApiDatabaseService.LinkIngredientToRecipe(recipe.id,IngredientDatabaseID,Ingredient);
        }else{
            return;
        }
        
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
    }
}

module.exports = IngredientService;