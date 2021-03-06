import React from "react";
import fetchMock from "fetch-mock";
import SearchByIngredient from "../../components/searchPage/SearchByIngredient";
import recipesByIngredientMock from "../../testMockData/mockData";
import Store from "../../store/store.js";
import { mountWithProviderAndRouter } from "../../testUtils/integrationTestUtils";

const store = Store();

//empty offlineAPI mock for actions
jest.mock("../../Services/OfflineAPI.js", () => () => ({}));

describe("searchByIngredient Component/Redux Integration Tests", () => {
  afterEach(()=> {
        fetchMock.restore();
  });

  test("Search Button Pressed. Recipes get Added to Store", async () => {
    fetchMock.mock("*", {
      body: recipesByIngredientMock,
      headers: { "content-type": "application.json" }
    });
  
    const expected = recipesByIngredientMock;
  
    const wrapper = mountWithProviderAndRouter(<SearchByIngredient/>, store);
    const searchBoxWrapper = wrapper.find("#searchBox");
    const searchButtonWrapper = wrapper.find("#searchButton");
  
    searchBoxWrapper.instance().value = "testIngredient";
    searchButtonWrapper.simulate("click");
  
    await Promise.all([fetchMock.flush(false)]);
    expect(store.getState().greenBeanAPI.recipes).toEqual(expected);
  });

  test.each(["Enter", "Tab", ","])("\"%s\" Key Pressed. Recipes get Added to Store", async (key) => {
    fetchMock.mock("*", {
      body: recipesByIngredientMock,
      headers: { "content-type": "application.json" }
    });
  
    const expected = recipesByIngredientMock;
  
    const wrapper = mountWithProviderAndRouter(<SearchByIngredient/>, store);
    const searchBoxWrapper = wrapper.find("#searchBox");
  
    searchBoxWrapper.instance().value = "testName";
    searchBoxWrapper.simulate('keypress', {key: key});
  
    await Promise.all([fetchMock.flush(false)]);
    expect(store.getState().greenBeanAPI.recipes).toEqual(expected);
  });
})