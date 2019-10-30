import RecipeAddModel from "../models/Recipe";
import IngredientsList from "../models/IngredientsList"
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
      SearchForRecipeByIngredient: async function(IngredientsList){
          let IngredientsListArray = IngredientsList.split(',')
          let FormatedRequestBody = new IngredientsList(IngredientsListArray);
          

          const settings = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: FormatedRequestBody
          };

          console.log(settings.body);

          
          let APIResult = fetch("http://api.greenbeancooking.com/getrecipebyingredientslist",settings).then(response=>response.json()).then(data=>console.log(data))




      }
}

export default GreenBeanAPIService