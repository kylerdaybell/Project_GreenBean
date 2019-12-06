import * as Reducer from "../store/reducers";
import * as actions from "../store/actions/onlineActions";
import * as resultActions from "../store/actions/resultActions";
import recipesByIngredientMock from "../testMockData/mockData";
import * as initialState from "../store/initialState";
//empty offlineAPI mock for actions
jest.mock('../Services/OfflineAPI.js', ()=>()=>({

}))
test("should add recipes when passed SEARCH_BY_INGREDIENT_SUCCESS", () => {
  const testState = initialState.greenBeanAPI;
  const recipes = recipesByIngredientMock;
  const action = resultActions.SearchByIngredientSuccess(recipes);

  const expectedState = {
    ...initialState.greenBeanAPI,
    recipes: recipes
  };

  const actualState = Reducer.greenBeanAPIReducer(testState, action);

  expect(actualState).toEqual(expectedState);
});

test("should add credentials when passed LOGIN_SUCCESS", ()=>{
    const testState = initialState.credentials;
    const testEmail = "TestEmail";
    const testPassword = "TestPassword";
    const testUserId = 5;
    const action = resultActions.LoginSuccess(testEmail, testPassword, testUserId);

    const expectedState = {
        ...initialState.credentials,
        loggedIn: true, email: testEmail, password: testPassword, userId: testUserId
    }

    const actualState = Reducer.credentialsReducer(testState, action);

    expect(actualState).toEqual(expectedState);
})

test("should clear credentials when passed LOGOUT", ()=>{
    const testEmail = "TestEmail";
    const testPassword = "TestPassword";
    const testUserId = 5;
    const testState = {
        ...initialState.credentials,
        loggedIn: true, email: testEmail, password: testPassword, userId: testUserId
    }
    const action = actions.Logout();

    const expectedState = initialState.credentials;

    const actualState = Reducer.credentialsReducer(testState, action)

    expect(actualState).toEqual(expectedState);
})