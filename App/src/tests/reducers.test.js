import * as Reducer from "../store/reducers";
import * as actions from "../store/actions";
import recipesByIngredientMock from "../testMockData/mockData";
import * as initialState from "../store/initialState";

it("should add recipes when passed SEARCH_BY_INGREDIENT_SUCCESS", () => {
  const testState = initialState.greenBeanAPI;
  const recipes = recipesByIngredientMock;
  const action = actions.SearchByIngredientSuccess(recipes);

  const expectedState = {
    recipes: recipes,
    credentials: { loggedIn: false, email: "", password: "" }
  };

  const actualState = Reducer.greenBeanAPIReducer(testState, action);

  expect(actualState).toEqual(expectedState);
});

it("should add credentials when passed LOGIN_SUCCESS", ()=>{
    const testState = initialState.greenBeanAPI;
    const testEmail = "TestEmail";
    const testPassword = "TestPassword";
    const action = actions.LoginSuccess(testEmail, testPassword);

    const expectedState = {
        recipes: [],
        credentials: { loggedIn: true, email: testEmail, password: testPassword}
    }

    const actualState = Reducer.greenBeanAPIReducer(testState, action);

    expect(actualState).toEqual(expectedState);
})

it("should clear credentials when passed LOGOUT", ()=>{
    const testEmail = "TestEmail";
    const testPassword = "TestPassword";
    const testState = {
        recipes: [],
        credentials: { loggedIn: true, email: testEmail, password: testPassword}
    }
    const action = actions.Logout();

    const expectedState = initialState.greenBeanAPI;

    const actualState = Reducer.greenBeanAPIReducer(testState, action)

    expect(actualState).toEqual(expectedState);
})