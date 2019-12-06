import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import * as ActionTypes from "../store/constants";
import * as Actions from "../store/actions/onlineActions";
import recipesByIngredientMock from "../testMockData/mockData";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

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

    const store = mockStore();
    return store
      .dispatch(
        Actions.SearchForRecipeByIngredientOnline("mockIngredient,mockingredient")
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

    const store = mockStore();
    return store
      .dispatch(
        Actions.SearchForRecipeByNameOnline("fakeName")
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

    const store = mockStore();
    return store
      .dispatch(
        Actions.SearchForRecipeByCategoryOnline("fakeCategory")
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

    const store = mockStore();
    return store
      .dispatch(
        Actions.GetTopTenRecipesOnline()
      )
      .then(() => expect(store.getActions()).toEqual(expected));
  });
})