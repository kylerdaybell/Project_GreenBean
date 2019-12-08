import React from "react";
import fetchMock from "fetch-mock";
import SettingsPage from "../../components/settings/SettingsPage";
import Store from "../../store/store.js";
import { mountWithProviderAndRouter } from "../../testUtils/integrationTestUtils";
import {initialState} from "../../store/initialState";

const store = Store();

//empty offlineAPI mock for actions
jest.mock("../../Services/OfflineAPI.js", () => () => ({}));

describe("settings page Component/Redux Integration Tests", () => {
  afterEach(()=> {
        fetchMock.restore();
  });

  test.each([true, false])("Change Mode Button Pressed. Mode starts as %s. Mode is Changed in Store", (initial) => {
    //setup custom initial state for this test
    const testStore = Store({...initialState, greenBeanAPI: {...initialState.greenBeanAPI, offlineMode: initial}})
  
    const expected = !initial;
  
    const wrapper = mountWithProviderAndRouter(<SettingsPage/>, testStore);
    const changeModeButton = wrapper.find("#changeModeButton");

    changeModeButton.simulate("click");

    expect(testStore.getState().greenBeanAPI.offlineMode).toEqual(expected);
  });
})