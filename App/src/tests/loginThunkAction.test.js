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
    test("Successful Login. dispatch Login Success", () => {
        fetchMock.mock("*", {
            body: {Result: "Success", UserId: -1},
            headers: { "content-type": "application/json" }
        })

        const expected = [
            {
                type: ActionTypes.LOGIN_SUCCESS,
                loggedIn: true,
                email: "testEmail@test.com",
                password: "testPassword1%",
                userId: -1
            }
        ]

        const store = mockStore();
        return store
        .dispatch(
            Actions.Login("testEmail@test.com","testPassword1%")
        )
        .then(()=> expect(store.getActions()).toEqual(expected))
    })
    
    test("Failed Login. dispatch Login Failure", () => {
        fetchMock.mock("*", {
            body: {Result: "Failure", UserId: -1},
            headers: { "content-type": "application/json" }
        })

        const expected = [
            {
                type: ActionTypes.LOGIN_FAILURE
            }
        ]

        const store = mockStore();
        return store
        .dispatch(
            Actions.Login("testEmail@test.com","testPassword1%")
        )
        .then(()=> expect(store.getActions()).toEqual(expected))
    })

    test("Login API call failed. dispatch Login Failure", () => {
        fetchMock.mock("*", Promise.reject())

        const expected = [
            {
                type: ActionTypes.LOGIN_FAILURE
            }
        ]

        const store = mockStore();
        return store
        .dispatch(
            Actions.Login("testEmail@test.com","testPassword1%")
        )
        .then(()=> expect(store.getActions()).toEqual(expected))
    });

    test("Login Success. return true", () => {
        fetchMock.mock("*", {
            body: {Result: "Success", UserId: -1},
            headers: { "content-type": "application/json" }
        })

        const expected = true

        const store = mockStore();
        return store
        .dispatch(
            Actions.Login("testEmail@test.com","testPassword1%")
        )
        .then((actual)=> expect(actual).toEqual(expected))
    });

    test("Login Failure. return false", () => {
        fetchMock.mock("*", {
            body: {Result: "Failure"},
            headers: { "content-type": "application/json" }
        })

        const expected = false

        const store = mockStore();
        return store
        .dispatch(
            Actions.Login("testEmail@test.com","testPassword1%")
        )
        .then((actual)=> expect(actual).toEqual(expected))
    });

    test("Login API fails. return false", () => {
        fetchMock.mock("*", Promise.reject())

        const expected = false

        const store = mockStore();
        return store
        .dispatch(
            Actions.Login("testEmail@test.com","testPassword1%")
        )
        .then((actual)=> expect(actual).toEqual(expected))
    });
});