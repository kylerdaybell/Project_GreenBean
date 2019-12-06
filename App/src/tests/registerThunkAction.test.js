import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import * as ActionTypes from "../store/constants";
import * as Actions from "../store/actions/onlineActions";
import {initialState} from "../store/initialState";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
//empty offlineAPI mock for actions
jest.mock('../Services/OfflineAPI.js', ()=>()=>({

}))
describe("Register Tests", () => {
    afterEach(()=> {
        fetchMock.restore();
    });
    test("Successful Register. dispatch Register Success", ()=>{
      fetchMock.mock("*", {
        body: JSON.stringify("Result: Success"),
        headers: {"content-type": "application.json"}
      })
  
      const expected = [
        {
          type: ActionTypes.REGISTER_SUCCESS
        }
      ]
      const  store = mockStore(initialState);
      return store
      .dispatch(
        Actions.Register("testemail@test.com","testPassword1%","testPassword1%")
      )
      .then(()=> expect(store.getActions()).toEqual(expected))
    });
  
    test("Failed Register. Dispatch Register Failure", ()=>{
      fetchMock.mock("*",{
        body: JSON.stringify("Result: Failure"),
        headers: {"content-type": "application.json"}
      })
  
      const expected = [
        {
          type: ActionTypes.REGISTER_FAILURE
        }
      ]
  
      const store = mockStore(initialState);
      return store
      .dispatch(
        Actions.Register("testemail@test.com","testPassword1%","testPassword1%")
      )
      .then(()=>expect(store.getActions()).toEqual(expected))
    })

    test("Register API Failed. Dispatch Register Failure", ()=>{
        fetchMock.mock("*", Promise.reject())
    
        const expected = [
          {
            type: ActionTypes.REGISTER_FAILURE
          }
        ]
    
        const store = mockStore(initialState);
        return store
        .dispatch(
          Actions.Register("testemail@test.com","testPassword1%","testPassword1%")
        )
        .then(()=>expect(store.getActions()).toEqual(expected))
      })
  
    test("Failed Register. Return false", () => {
      fetchMock.mock("*",{
        body: JSON.stringify("Result: Failure"),
        headers: {"content-type": "application.json"}
      });
  
      const expected = false;
      const store = mockStore(initialState);
      return store
      .dispatch(
        Actions.Register("testemail@test.com","testPassword1%","testPassword1%")
      )
      .then((actual)=>expect(actual).toEqual(expected))
    })

    test("Register API call fails. Return false", () => {
        fetchMock.mock("*",Promise.reject());
    
        const expected = false;
        const store = mockStore(initialState);
        return store
        .dispatch(
          Actions.Register("testemail@test.com","testPassword1%","testPassword1%")
        )
        .then((actual)=>expect(actual).toEqual(expected))
    })
  
    test("Successful Register. Returns true", () => {
      fetchMock.mock("*",{
        body: JSON.stringify("Result: Success"),
        headers: {"content-type": "application.json"}
      });
  
      const expected = true;
      const store = mockStore(initialState);
      return store
      .dispatch(
        Actions.Register("testemail@test.com","testPassword1%","testPassword1%")
      )
      .then((actual)=>expect(actual).toEqual(expected))
    })
  })