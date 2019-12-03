export const greenBeanAPI = {
  recipes: [],
  homePageRecipes: [],
  credentials: { loggedIn: false, email: "", password: "" },
  offlineMode: false
};

export const status = {
  loginSuccess: null,
  addRecipeSuccess: null
}

export const initialState = {
  status,
  greenBeanAPI
}