import { createStore } from "redux";
import { greenBeanAPIReducer } from "../store/reducers";
import initialState from "../store/initialState";
import * as actions from "../store/actions/onlineActions";
import * as resultActions from "../store/actions/resultActions";
import recipesByIngredientMock from "../testMockData/mockData";

describe("Redux Store Integration Tests For greenBeanAPIReducer", () => {
  it("store should get recipes by ingredient", () => {
    const store = createStore(greenBeanAPIReducer, initialState);
    const recipes = recipesByIngredientMock;

    const action = resultActions.SearchByIngredientSuccess(recipes);
    store.dispatch(action);
    const expected = recipesByIngredientMock;

    const actual = store.getState().recipes;
    expect(actual).toEqual(expected);
  });

  it("store should set login credentials when LoginSuccess is called", () => {
    const store = createStore(greenBeanAPIReducer, initialState);
    const testEmail = "TestEmail";
    const testPassword = "TestPassword";

    const action = resultActions.LoginSuccess(testEmail, testPassword);
    store.dispatch(action);

    const expected = { loggedIn: true, email: testEmail, password: testPassword };
    const actual = store.getState().credentials;
    
    expect(actual).toEqual(expected);
  })

  it("store should clear login credentials when Logout is called", () => {
    const testEmail = "TestEmail";
    const testPassword = "TestPassword";
    const testState = {
        recipes: [],
        credentials: { loggedIn: true, email: testEmail, password: testPassword}
    }
    const store = createStore(greenBeanAPIReducer, testState);

    const action = actions.Logout();
    store.dispatch(action);

    const expected = { loggedIn: false, email: "", password: "" };
    const actual = store.getState().credentials;

    expect(actual).toEqual(expected);
  })
});
