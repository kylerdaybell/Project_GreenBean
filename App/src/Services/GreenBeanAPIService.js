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
        }).then(response=>response.json).then(data=>console.log(data))
      },
      SearchForRecipeByName: function(SearchTerm){
          console.log(SearchTerm);
          fetch(`http://api.greenbeancooking.com/searchrecipebyname/${SearchTerm}`,{
            method: 'GET',
          }).then(response=>response.json).then(data=>console.log(JSON.stringify(data)))
      }
}

export default GreenBeanAPIService