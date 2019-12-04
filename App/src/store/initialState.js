export const greenBeanAPI = {
  recipes: [],
  homePageRecipes: [],
  credentials: { loggedIn: false, email: "", password: "", userId: null },
  offlineMode: false
};

export const status = {
  loginSuccess: null,
  addRecipeSuccess: null,
  registerSuccess: null
}

export const initialState = {
  status,
  greenBeanAPI
}