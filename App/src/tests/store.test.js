import { createStore, combineReducers } from "redux";
import {greenBeanAPIReducer, statusReducer} from "../store/reducers";
import {initialState} from "../store/initialState";
import * as actions from "../store/actions/onlineActions";
import * as resultActions from "../store/actions/resultActions";
import recipesByIngredientMock from "../testMockData/mockData";

describe("Redux Store Integration Tests For greenBeanAPIReducer", () => {
  const rootReducer = combineReducers({
    greenBeanAPI: greenBeanAPIReducer,
    status: statusReducer
  })

  test("store should get recipes by ingredient", () => {
    const store = createStore(rootReducer);
    const recipes = recipesByIngredientMock;

    const action = resultActions.SearchByIngredientSuccess(recipes);
    store.dispatch(action);
    const expected = recipesByIngredientMock;

    const actual = store.getState().greenBeanAPI.recipes;
    expect(actual).toEqual(expected);
  });

  test("store should set login credentials when LoginSuccess is called", () => {
    const store = createStore(rootReducer, initialState);
    const testEmail = "TestEmail";
    const testPassword = "TestPassword";

    const action = resultActions.LoginSuccess(testEmail, testPassword);
    store.dispatch(action);

    const expected = { loggedIn: true, email: testEmail, password: testPassword };
    const actual = store.getState().greenBeanAPI.credentials;
    
    expect(actual).toEqual(expected);
  })

  test("store should clear login credentials when Logout is called", () => {
    const testEmail = "TestEmail";
    const testPassword = "TestPassword";
    const testState = {
      ...initialState,
      greenBeanAPI: {
        credentials: { loggedIn: true, email: testEmail, password: testPassword}
      }
    }
    const store = createStore(rootReducer, testState);

    const action = actions.Logout();
    store.dispatch(action);

    const expected = { loggedIn: false, email: "", password: "" };
    const actual = store.getState().greenBeanAPI.credentials;

    expect(actual).toEqual(expected);
  })
});
