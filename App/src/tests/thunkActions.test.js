import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import * as ActionTypes from "../store/constants";
import * as OnlineActions from "../store/actions/onlineActions";
import * as Actions from "../store/actions/actions";
import recipesByIngredientMock from "../testMockData/mockData";
import {initialState} from "../store/initialState";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
//empty offlineAPI mock for actions
jest.mock('../Services/OfflineAPI.js', ()=>()=>({

}))
describe("Get Recipe By Ingredient Tests", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  test("Successful SearchByIngredient API call. dispatch SEARCH_RECIPE_SUCCESS", () => {
    fetchMock.mock("*", {
      body: recipesByIngredientMock,
      headers: { "content-type": "application/json" }
    });

    const expected = [
      {
        type: ActionTypes.SEARCH_RECIPE_SUCCESS,
        recipes: recipesByIngredientMock
      }
    ];

    const store = mockStore(initialState);
    return store
      .dispatch(
        Actions.SearchForRecipeByIngredient("mockIngredient,mockingredient")
      )
      .then(() => expect(store.getActions()).toEqual(expected));
  });
});

describe("Get Recipe By Name Tests", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  test("Successful SearchByName API call. dispatch SEARCH_RECIPE_SUCCESS", () => {
    fetchMock.mock("*", {
      body: recipesByIngredientMock,
      headers: { "content-type": "application/json" }
    });

    const expected = [
      {
        type: ActionTypes.SEARCH_RECIPE_SUCCESS,
        recipes: recipesByIngredientMock
      }
    ];

    const store = mockStore(initialState);
    return store
      .dispatch(
        OnlineActions.SearchForRecipeByNameOnline("fakeName")
      )
      .then(() => expect(store.getActions()).toEqual(expected));
  });
})

describe("Get Recipe By Category Tests", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  test("Successful SearchByCategory API call. dispatch SEARCH_RECIPE_SUCCESS", () => {
    fetchMock.mock("*", {
      body: recipesByIngredientMock,
      headers: { "content-type": "application/json" }
    });

    const expected = [
      {
        type: ActionTypes.SEARCH_RECIPE_SUCCESS,
        recipes: recipesByIngredientMock
      }
    ];

    const store = mockStore(initialState);
    return store
      .dispatch(
        OnlineActions.SearchForRecipeByCategoryOnline("fakeCategory")
      )
      .then(() => expect(store.getActions()).toEqual(expected));
  });
})

describe("Get Top Recipes Test", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  test("Successful GetTopRecipes API call. dispatch GET_TOP_TEN_SUCCESS", () => {
    fetchMock.mock("*", {
      body: recipesByIngredientMock,
      headers: { "content-type": "application/json" }
    });

    const expected = [
      {
        type: ActionTypes.GET_TOP_TEN_SUCCESS,
        recipes: recipesByIngredientMock
      }
    ];

    const store = mockStore(initialState);
    return store
      .dispatch(
        Actions.GetTopRecipes()
      )
      .then(() => expect(store.getActions()).toEqual(expected));
  });
})