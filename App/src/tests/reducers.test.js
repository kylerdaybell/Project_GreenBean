import * as Reducer from "../store/reducers";
import * as actions from "../store/actions/onlineActions";
import * as resultActions from "../store/actions/resultActions";
import * as ActionTypes from "../store/constants";
import recipesByIngredientMock from "../testMockData/mockData";
import * as initialState from "../store/initialState";
//empty offlineAPI mock for actions
jest.mock('../Services/OfflineAPI.js', ()=>()=>({

}))
test("should add recipes when SearchByIngredientSuccess is called", () => {
  const testState = initialState.greenBeanAPI;
  const recipes = recipesByIngredientMock;
  const action = resultActions.SearchByIngredientSuccess(recipes);

  const expectedState = {
    ...initialState.greenBeanAPI,
    recipes: recipes
  };
  const expectedActionType = ActionTypes.SEARCH_RECIPE_SUCCESS;

  const actualState = Reducer.greenBeanAPIReducer(testState, action);
  const actualActionType = action.type;

  expect(actualState).toEqual(expectedState);
  expect(actualActionType).toEqual(expectedActionType);
});

test("should add recipes when SearchByNameSuccess is called", () => {
  const testState = initialState.greenBeanAPI;
  const recipes = recipesByIngredientMock;
  const action = resultActions.SearchByNameSuccess(recipes);

  const expectedState = {
    ...initialState.greenBeanAPI,
    recipes: recipes
  };
  const expectedActionType = ActionTypes.SEARCH_RECIPE_SUCCESS;

  const actualState = Reducer.greenBeanAPIReducer(testState, action);
  const actualActionType = action.type;

  expect(actualState).toEqual(expectedState);
  expect(actualActionType).toEqual(expectedActionType);
});

test("should add recipes when SearchByCategorySuccess is called", () => {
  const testState = initialState.greenBeanAPI;
  const recipes = recipesByIngredientMock;
  const action = resultActions.SearchByCategorySuccess(recipes);

  const expectedState = {
    ...initialState.greenBeanAPI,
    recipes: recipes
  };
  const expectedActionType = ActionTypes.SEARCH_RECIPE_SUCCESS;

  const actualState = Reducer.greenBeanAPIReducer(testState, action);
  const actualActionType = action.type;

  expect(actualState).toEqual(expectedState);
  expect(actualActionType).toEqual(expectedActionType);
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
    const expectedActionType = ActionTypes.LOGIN_SUCCESS;

    const actualState = Reducer.credentialsReducer(testState, action);
    const actualActionType = action.type;

    expect(actualState).toEqual(expectedState);
    expect(actualActionType).toEqual(expectedActionType);
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
    const expectedActionType = ActionTypes.LOGOUT;

    const actualState = Reducer.credentialsReducer(testState, action);
    const actualActionType = action.type;

    expect(actualState).toEqual(expectedState);
    expect(actualActionType).toEqual(expectedActionType);
})