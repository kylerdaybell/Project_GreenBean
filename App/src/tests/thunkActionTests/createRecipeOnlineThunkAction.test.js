import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import RecipeAddModel from "../../models/Recipe";
import * as ActionTypes from "../../store/constants";
import * as Actions from "../../store/actions/actions";
import {initialState} from "../../store/initialState";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);
const successBody = JSON.stringify("Result: Success");
const failBody = JSON.stringify("Result: Failure");
const recipeAdd = new RecipeAddModel();
//empty offlineAPI mock for actions
jest.mock('../../Services/OfflineAPI.js', ()=>()=>({

}))
describe("Create Recipe Online Tests", () => {
    afterEach(()=> {
        fetchMock.restore();
    });
    test("Create Recipe Success. Dispatch CreateRecipeSuccess", ()=>{
        fetchMock.mock("*", {
            body: successBody,
            headers: {"content-type": "application.json"}
        });

        const expected = [
            {
                type: ActionTypes.CREATE_NEW_RECIPE_SUCCESS
            }
        ]

        const store = mockStore(initialState);
        return store
        .dispatch(
            Actions.CreateNewRecipe(recipeAdd)
        )
        .then(()=>expect(store.getActions()).toEqual(expected))
    });

    test("Create Recipe Failure. Dispatch CreateRecipeFailure", ()=>{
        fetchMock.mock("*", {
            body: failBody,
            headers: {"content-type": "application.json"}
        });

        const expected = [
            {
                type: ActionTypes.CREATE_NEW_RECIPE_FAILURE
            }
        ]

        const store = mockStore(initialState);
        return store
        .dispatch(
            Actions.CreateNewRecipe(recipeAdd)
        )
        .then(()=>expect(store.getActions()).toEqual(expected))
    });

    test("Create Recipe API fails. Dispatch CreateRecipeFailure", ()=>{
        fetchMock.mock("*", Promise.reject);

        const expected = [
            {
                type: ActionTypes.CREATE_NEW_RECIPE_FAILURE
            }
        ]

        const store = mockStore(initialState);
        return store
        .dispatch(
            Actions.CreateNewRecipe(recipeAdd)
        )
        .then(()=>expect(store.getActions()).toEqual(expected))
    });

    test("Create Recipe Success. return true", () => {
        fetchMock.mock("*", {
            body: successBody,
            headers: {"content-type": "application.json"}
        });

        const expected = true;

        const store = mockStore(initialState);
        return store
        .dispatch(Actions.CreateNewRecipe(recipeAdd))
        .then((actual)=>expect(actual).toEqual(expected))
    });

    test("Create Recipe Failure. return false", () => {
        fetchMock.mock("*", {
            body: failBody,
            headers: {"content-type": "application.json"}
        });

        const expected = false;

        const store = mockStore(initialState);
        return store
        .dispatch(Actions.CreateNewRecipe(recipeAdd))
        .then((actual)=>expect(actual).toEqual(expected))
    });

    test("Create Recipe API Failure. return false", () => {
        fetchMock.mock("*", Promise.reject());

        const expected = false;

        const store = mockStore(initialState);
        return store
        .dispatch(Actions.CreateNewRecipe(recipeAdd))
        .then((actual)=>expect(actual).toEqual(expected))
    });
});