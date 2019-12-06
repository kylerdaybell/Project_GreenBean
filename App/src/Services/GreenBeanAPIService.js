import GreenBeanUtilityService from "./GreenBeanUtilityService";

const URL = "https://api.greenbeancooking.com";

const GreenBeanAPIService={
     CreateNewRecipe: function(recipe){
        return fetch(`${URL}/createrecipe`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          body: recipe
        }).then(response=>response.json())
        .catch(error=>Promise.reject());
      },
      DeleteRecipe: function(deleteRequest) {
        return fetch(`${URL}/deleterecipe`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          mode: 'cors',
          body: JSON.stringify(deleteRequest)
        }).then(response=>response.json())
        .catch(error=>Promise.reject());
      },
      SearchForRecipeByName: function(SearchTerm){
          return fetch(`${URL}/searchrecipebyname/${SearchTerm}`).then(response=>response.json())
          .catch(error=>Promise.reject());
      },
      SearchForRecipeByIngredient: function(List){
          let IngredientsListArray = GreenBeanUtilityService.prepIngredients(List);

          let FormatedRequestBody = {"IngredientsList":IngredientsListArray};
          let RealFormatedRequestBody = JSON.stringify(FormatedRequestBody);
          const settings = {
            method: 'POST',
            headers: {
              'Access-Control-Allow-Origin':"",
              'Content-Type': 'application/json',
            },
            mode: 'cors',
            body: RealFormatedRequestBody
          };
          return fetch(`${URL}/getrecipebyingredientslist`,settings)
          .then(response=>response.json())
          .catch(error=>Promise.reject())
      },
      SearchForRecipeByCategory: function(category){
        return fetch(`${URL}/getrecipebycategory/${category}`).then(response=>response.json())
        .catch(error=>Promise.reject())
      },
      Login: function(email,password){
        let request = {"email": email, "password":password}
        let RealFormatedRequestBody = JSON.stringify(request);
        const settings = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: RealFormatedRequestBody
        };
        return fetch(`${URL}/login`,settings).then(response=> response.json())
        .catch(error=>Promise.reject())
      },
      Register: function(email,password,validate){
        let request = {"email":email,"password":password,"validate":validate}
        let RealFormatedRequestBody = JSON.stringify(request);
        const settings = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
          body: RealFormatedRequestBody
        }
        return fetch(`${URL}/register`,settings).then(response=>response.json())
        .catch(error=>Promise.reject())
      },
      GetTopTenRecipes: function(){
        return fetch(`${URL}/gettoptenrecipes`).then(response=>response.json())
        .catch(error=>Promise.reject())
      }
}

export default GreenBeanAPIService