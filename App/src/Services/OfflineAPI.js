import DefaultImage from "../resources/default.jpg"
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

  SearchForRecipeByIngredient(ingredientList) {
    ///TODO complete logic
  }

  async SearchForRecipeByCategory(category) {
    return this.data["recipes"].filter(r =>
      r.recipe.category.toLowerCase().includes(category.toLowerCase())
    );
  }

  async GetTopTenRecipes() {
    return this.data["recipes"];
  }

  AdvancedSearch(ingredientList, category) {
    ///TODO complete logic
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
