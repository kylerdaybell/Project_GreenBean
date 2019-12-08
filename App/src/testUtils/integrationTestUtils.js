import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { mount, configure } from "enzyme";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

configure({ adapter: new Adapter() });

export function mountWithProviderAndRouter(component, store) {
    return mount(
      <Provider store={store}>
        <MemoryRouter>
          {component}
        </MemoryRouter>
      </Provider>
    );
}