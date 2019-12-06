import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import * as ActionTypes from "../store/constants";
import * as Actions from "../store/actions/onlineActions";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Login Tests", () => {
    afterEach(()=> {
        fetchMock.restore();
    });
    test("tempTest", ()=>{
        expect(true).toEqual(true);
    })
});