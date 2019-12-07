import React from "react";
import fetchMock from "fetch-mock";
import SearchByCategory from "../../components/searchPage/SearchByCategory";
import recipesByIngredientMock from "../../testMockData/mockData";
import Store from "../../store/store.js";
import { mountWithProviderAndRouter } from "../../testUtils/integrationTestUtils";

const store = Store();

//empty offlineAPI mock for actions
jest.mock("../../Services/OfflineAPI.js", () => () => ({}));

describe("searchByCategory Component/Redux Integration Tests", () => {
  afterEach(()=> {
        fetchMock.restore();
  });

  test("Category Selected. Recipes get Added to Store", async () => {
    fetchMock.mock("*", {
      body: recipesByIngredientMock,
      headers: { "content-type": "application.json" }
    });
  
    const expected = recipesByIngredientMock;
  
    const wrapper = mountWithProviderAndRouter(<SearchByCategory/>, store);
    const searchDropdown = wrapper.find("#category");
    
    searchDropdown.simulate("change", {target: {value: "TestCategory"}});
  
    await Promise.all([fetchMock.flush(false)]);
    expect(store.getState().greenBeanAPI.recipes).toEqual(expected);
  });
})