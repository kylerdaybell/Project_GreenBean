import RecipeAddModel from "../models/Recipe";
import Ingredient from "../models/Ingredients"
const GreenBeanAPIService={
     CreateNewRecipe: function(recipe){
        fetch("http://api.greenbeancooking.com/createrecipe",{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          mode: 'cors',
          body: recipe
        }).then(response=>response.json()).then(data=>console.log(data))
      },
      SearchForRecipeByName: async function(SearchTerm){
          let APIResult = await fetch(`http://api.greenbeancooking.com/searchrecipebyname/${SearchTerm}`).then(response=>response.json())
          return APIResult;
      },
      SearchForRecipeByIngredient: async function(List){
          let ListArray = List.split(',')

          var IngredientsListArray = []
          
          for(let i = 0; i < ListArray.length; i++){
            let newIngredient = new Ingredient(ListArray[i])
            IngredientsListArray.push(newIngredient);
          }

          let FormatedRequestBody = {"IngredientsList":IngredientsListArray};
          let RealFormatedRequestBody = JSON.stringify(FormatedRequestBody);
          const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: RealFormatedRequestBody
          };
          let APIResult = fetch("http://api.greenbeancooking.com/getrecipebyingredientslist",settings).then(response=>response.json())
          return APIResult;
      }
}

export default GreenBeanAPIService