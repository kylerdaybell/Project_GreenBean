import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import * as ActionTypes from "../../store/constants";
import * as Actions from "../../store/actions/actions";
import {initialState} from "../../store/initialState";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const successBody = JSON.stringify("Result: Success");
const failBody = JSON.stringify("Result: Failure");
const deleteRecipeIdMock = 0;

//empty offlineAPI mock for actions
jest.mock('../../Services/OfflineAPI.js', ()=>()=>({

}))

describe("Delete Recipe Online Tests", () => {
    afterEach(()=> {
        fetchMock.restore();
    });
    test("Delete Recipe Success. Dispatch DeleteRecipeSuccess", ()=>{
        fetchMock.mock("*", {
            body: successBody,
            headers: {"content-type": "application.json"}
        });

        const expected = [
            {
                type: ActionTypes.DELETE_RECIPE_SUCCESS,
                recipeId: deleteRecipeIdMock
            }
        ]

        const store = mockStore(initialState);
        return store
        .dispatch(
            Actions.DeleteRecipe(deleteRecipeIdMock)
        )
        .then(()=>expect(store.getActions()).toEqual(expected))
    });

    test("Delete Recipe Failure. Dispatch DeleteRecipeFailure", ()=>{
        fetchMock.mock("*", {
            body: failBody,
            headers: {"content-type": "application.json"}
        });

        const expected = [
            {
                type: ActionTypes.DELETE_RECIPE_FAILURE
            }
        ]

        const store = mockStore(initialState);
        return store
        .dispatch(
            Actions.DeleteRecipe(deleteRecipeIdMock)
        )
        .then(()=>expect(store.getActions()).toEqual(expected))
    });

    test("Delete Recipe API Failure. Dispatch DeleteRecipeFailure", ()=>{
        fetchMock.mock("*", Promise.reject());

        const expected = [
            {
                type: ActionTypes.DELETE_RECIPE_FAILURE
            }
        ]

        const store = mockStore(initialState);
        return store
        .dispatch(
            Actions.DeleteRecipe(deleteRecipeIdMock)
        )
        .then(()=>expect(store.getActions()).toEqual(expected))
    });

    test("Delete Recipe Success. return true", () => {
        fetchMock.mock("*", {
            body: successBody,
            headers: {"content-type": "application.json"}
        });

        const expected = true;

        const store = mockStore(initialState);
        return store
        .dispatch(Actions.DeleteRecipe(deleteRecipeIdMock))
        .then((actual)=>expect(actual).toEqual(expected))
    });

    test("Delete Recipe Failure. return false", () => {
        fetchMock.mock("*", {
            body: failBody,
            headers: {"content-type": "application.json"}
        });

        const expected = false;

        const store = mockStore(initialState);
        return store
        .dispatch(Actions.DeleteRecipe(deleteRecipeIdMock))
        .then((actual)=>expect(actual).toEqual(expected))
    });

    test("Delete Recipe API Failure. return false", () => {
        fetchMock.mock("*", Promise.reject());

        const expected = false;

        const store = mockStore(initialState);
        return store
        .dispatch(Actions.DeleteRecipe(deleteRecipeIdMock))
        .then((actual)=>expect(actual).toEqual(expected))
    });
});