import React from "react";
import fetchMock from "fetch-mock";
import SearchByNamePage from "../../components/searchPage/SearchByNamePage";
import Header from "../../components/shared/Header";
import recipesByIngredientMock from "../../testMockData/mockData";
import Store from "../../store/store.js";
import { mountWithProviderAndRouter } from "../../testUtils/integrationTestUtils";

const store = Store();

//empty offlineAPI mock for actions
jest.mock("../../Services/OfflineAPI.js", () => () => ({}));

describe("searchByName Header and SearchByNamePage Component/Redux Integration Tests", () => {
  afterEach(()=> {
        fetchMock.restore();
  });

  test.each([<Header/>,<SearchByNamePage/>])("Search Button Pressed. Recipes get Added to Store", async (component) => {
    fetchMock.mock("*", {
      body: recipesByIngredientMock,
      headers: { "content-type": "application.json" }
    });
  
    const expected = recipesByIngredientMock;
  
    const wrapper = mountWithProviderAndRouter(component, store);
    const searchBoxWrapper = wrapper.find("#searchBox");
    const searchButtonWrapper = wrapper.find("#searchButton");
  
    searchBoxWrapper.instance().value = "testName";
    searchButtonWrapper.simulate("click");
  
    await Promise.all([fetchMock.flush(false)]);
    expect(store.getState().greenBeanAPI.recipes).toEqual(expected);
  });

  test.each([<SearchByNamePage/>,<Header/>])("Enter Key Pressed. Recipes get Added to Store", async (component) => {
    fetchMock.mock("*", {
      body: recipesByIngredientMock,
      headers: { "content-type": "application.json" }
    });
  
    const expected = recipesByIngredientMock;
  
    const wrapper = mountWithProviderAndRouter(component, store);
    const searchBoxWrapper = wrapper.find("#searchBox");
  
    searchBoxWrapper.instance().value = "testName";
    searchBoxWrapper.simulate('keypress', {key: 'Enter'});
  
    await Promise.all([fetchMock.flush(false)]);
    expect(store.getState().greenBeanAPI.recipes).toEqual(expected);
  });
})

