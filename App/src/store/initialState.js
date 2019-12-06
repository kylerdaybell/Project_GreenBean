export const greenBeanAPI = {
  recipes: [],
  homePageRecipes: [],
  offlineMode: false
};

export const credentials = {
  loggedIn: false,
  email: "",
  password: "",
  userId: null
}

export const initialState = {
  credentials,
  greenBeanAPI
}