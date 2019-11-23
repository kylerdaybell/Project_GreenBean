import Ingredient from "../models/Ingredients";

const GreenBeanUtilityService = {
  prepIngredients: function(ingredients) {
    let ListArray = ingredients.split(",");

    var IngredientsListArray = [];

    for (let i = 0; i < ListArray.length; i++) {
      let newIngredient = new Ingredient(ListArray[i]);
      IngredientsListArray.push(newIngredient);
    }
    return IngredientsListArray;
  }
};

export default GreenBeanUtilityService;