import GreenBeanUtilityService from "./GreenBeanUtilityService";
import DefaultImage from "../resources/defaultSmaller.jpg"
const electron = window.electron;
const path = window.path;
const fs = window.fs;

class OfflineAPIClass {
  constructor() {
    //get correct path for OS
    const userDataPath = (electron.app || electron.remote.app).getPath(
      "userData"
    );
    this.path = path.join(userDataPath, "myRecipes.json");

    this.data = readFile(this.path);
  }

  async CreateNewRecipe(recipe) {
    let addedRecipe = { recipe: { ...JSON.parse(recipe), id: -1 } };
    this.IncrementRecipeCount();
    addedRecipe.recipe.id = this.data["recipeCount"];
    if(addedRecipe.recipe.picture === ""){
      addedRecipe.recipe.picture = DefaultImage;
    }
    try {
      this.data["recipes"].push(addedRecipe);
      await fs.writeFile(this.path, JSON.stringify(this.data), error => {
        if (error) {
          throw error;
        }
      });
    } catch {
      return "Result: Failure";
    }
    return "Result: Success";
  }

  async SearchForRecipeByName(name) {
    return this.data["recipes"].filter(r =>
      r.recipe.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  async SearchForRecipeByIngredient(ingredientList) {
    ingredientList = GreenBeanUtilityService.prepIngredients(ingredientList);
    let resultRecipes = [];
    this.data["recipes"].forEach(recipe => {
      let count = 0;
      if(typeof recipe.recipe.ingredientslist !== 'undefined'){
        recipe.recipe.ingredientslist.forEach(ingredient => {
          let result = ingredientList.find(i => (i.name.toLowerCase() === ingredient.name.toLowerCase()));
          if(typeof result !== 'undefined'){
            count = count + 1;
          }
        });
        if(count > 0){
          recipe.percentmatch = (count / recipe.recipe.ingredientslist.length) * 100;
          resultRecipes.push(recipe);
        }
      }
    });
    return resultRecipes.sort((recipe1, recipe2) => (recipe2.percentmatch - recipe1.percentmatch));
  }

  async SearchForRecipeByCategory(category) {
    return this.data["recipes"].filter(r =>
      r.recipe.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  async GetTopRecipes() {
    return this.data["recipes"].slice(0,9);
  }

  IncrementRecipeCount() {
    this.data["recipeCount"]++;
  }
}

function readFile(filePath) {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    //initialize file
    fs.writeFileSync(filePath, JSON.stringify({ recipes: [], recipeCount: 0 }));
    return { recipes: [], recipeCount: 0 };
  }
}

const OfflineAPI = new OfflineAPIClass();

export default OfflineAPI;
