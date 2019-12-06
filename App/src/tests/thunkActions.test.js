import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import * as ActionTypes from "../store/constants";
import * as Actions from "../store/actions/onlineActions";
import recipesByIngredientMock from "../testMockData/mockData";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Get Recipe By Ingredient", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  test("Successful API call. dispatch SEARCH_BY_INGREDIENT_SUCCESS", () => {
    fetchMock.mock("*", {
      body: recipesByIngredientMock,
      headers: { "content-type": "application/json" }
    });

    const expected = [
      {
        type: ActionTypes.SEARCH_BY_INGREDIENT_SUCCESS,
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


