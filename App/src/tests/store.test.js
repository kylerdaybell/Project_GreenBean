import { createStore, combineReducers } from "redux";
import {greenBeanAPIReducer, statusReducer} from "../store/reducers";
import {initialState} from "../store/initialState";
import * as actions from "../store/actions/actions";
import * as onlineActions from "../store/actions/onlineActions";
import * as resultActions from "../store/actions/resultActions";
import recipesByIngredientMock from "../testMockData/mockData";

//empty offlineAPI mock for actions
jest.mock('../Services/OfflineAPI.js', ()=>()=>({

}))
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
    const store = createStore(rootReducer);
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
    const testUserId = 5
    const testState = {
      ...initialState,
      greenBeanAPI: {
        credentials: { loggedIn: true, email: testEmail, password: testPassword, userId: testUserId}
      }
    }
    const store = createStore(rootReducer, testState);

    const action = onlineActions.Logout();
    store.dispatch(action);

    const expected = initialState.greenBeanAPI.credentials;
    const actual = store.getState().greenBeanAPI.credentials;

    expect(actual).toEqual(expected);
  })

  test("Get top recipes success should set recipes. ", () => {
    const store = createStore(rootReducer);
    const recipes = recipesByIngredientMock;

    const action = resultActions.GetTopTenRecipesSuccess(recipes);
    store.dispatch(action);
    const expected = recipesByIngredientMock;

    const actual = store.getState().greenBeanAPI.homePageRecipes;
    expect(actual).toEqual(expected);
  })

  test("Change mode should switch offlineMode from false to true", () => {
    const store = createStore(rootReducer);
    
    const action = actions.ChangeMode(store.getState().greenBeanAPI.offlineMode);
    store.dispatch(action);

    const expected = true;
    const actual = store.getState().greenBeanAPI.offlineMode;

    expect(actual).toEqual(expected);
  })

  test("ChangeMode should switch offlineMode from true to false", () => {
    const testState = {
      ...initialState,
      greenBeanAPI: {
        offlineMode: true
      }
    }

    const store = createStore(rootReducer, testState);
    
    const action = actions.ChangeMode(store.getState().greenBeanAPI.offlineMode);
    store.dispatch(action);

    const expected = false;
    const actual = store.getState().greenBeanAPI.offlineMode;

    expect(actual).toEqual(expected);
  })
});
