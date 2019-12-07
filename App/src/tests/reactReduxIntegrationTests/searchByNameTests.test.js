import React from "react";
import fetchMock from "fetch-mock";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import SearchByNamePage from "../../components/searchPage/SearchByNamePage";
import recipesByIngredientMock from "../../testMockData/mockData";
import Store from "../../store/store.js";

const store = Store();
configure({ adapter: new Adapter() });

//empty offlineAPI mock for actions
jest.mock("../../Services/OfflineAPI.js", () => () => ({}));

function render() {
  return mount(
    <Provider store={store}>
      <MemoryRouter>
        <SearchByNamePage />
      </MemoryRouter>
    </Provider>
  );
}

test("Search Button Pressed. Recipes get Added to Store", async () => {
  fetchMock.mock("*", {
    body: recipesByIngredientMock,
    headers: { "content-type": "application.json" }
  });

  const expected = recipesByIngredientMock;

  let wrapper = render();
  wrapper
    .find("#searchBox")
    .simulate("change", { target: { value: "testName" } });
  wrapper.find("#searchButton").simulate("click");
  await Promise.all([fetchMock.flush(false)]);
  expect(store.getState().greenBeanAPI.recipes).toEqual(expected);
});
