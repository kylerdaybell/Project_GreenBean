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
      }
}

export default GreenBeanAPIService