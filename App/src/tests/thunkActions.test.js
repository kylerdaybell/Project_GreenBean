import configureMockStore from "redux-mock-store";
import fetchMock from "fetch-mock";
import thunk from "redux-thunk";
import * as ActionTypes from "../store/constants";
import * as Actions from "../store/actions/onlineActions";
import recipesByIngredientMock from "../testMockData/mockData";
import * as initialState from "../store/initialState";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Get Recipe By Ingredient", () => {
  afterEach(() => {
    fetchMock.restore();
  });
  it("Successfull API call. dispatch SEARCH_BY_INGREDIENT_SUCCESS", () => {
    fetchMock.mock("*", {
      body: recipesByIngredientMock,
      headers: { "content-type": "application/json" }
    });

    const expected = [
      {
        type: ActionTypes.SEARCH_BY_INGREDIENT_SUCCESS,
        recipes: recipesByIngredientMock
      }
    ];

    const store = mockStore({ recipes: [] });
    return store
      .dispatch(
        Actions.SearchForRecipeByIngredient("mockIngredient,mockingredient")
      )
      .then(() => expect(store.getActions()).toEqual(expected));
  });
});

describe("Login Tests", () => {
    afterEach(()=> {
        fetchMock.restore();
    });
    it("Successfull Login. dispatch Login Success", () => {
        fetchMock.mock("*", {
            body: JSON.stringify("Result: Success"),
            headers: { "content-type": "application/json" }
        })

        const expected = [
            {
                type: ActionTypes.LOGIN_SUCCESS,
                loggedIn: true,
                email: "testEmail@test.com",
                password: "testPassword1%"
            }
        ]

        const store = mockStore({recipes: []});
        return store
        .dispatch(
            Actions.Login("testEmail@test.com","testPassword1%")
        )
        .then(()=> expect(store.getActions()).toEqual(expected))
    })
    
    it("Failed Login. dispatch Login Failure", () => {
        fetchMock.mock("*", {
            body: JSON.stringify("Result: Failure"),
            headers: { "content-type": "application/json" }
        })

        const expected = [
            {
                type: ActionTypes.LOGIN_FAILURE
            }
        ]

        const store = mockStore({recipes: []});
        return store
        .dispatch(
            Actions.Login("testEmail@test.com","testPassword1%")
        )
        .then(()=> expect(store.getActions()).toEqual(expected))
    })
});

describe("Register Tests", () => {
  afterEach(()=> {
      fetchMock.restore();
  });
  it("Successful Register. dispatch Register Success", ()=>{
    fetchMock.mock("*", {
      body: JSON.stringify("Result: Success"),
      headers: {"content-type": "application.json"}
    })

    const expected = [
      {
        type: ActionTypes.REGISTER_SUCCESS
      }
    ]
    const  store = mockStore(initialState.greenBeanAPI);
    return store
    .dispatch(
      Actions.Register("testemail@test.com","testPassword1%","testPassword1%")
    )
    .then(()=> expect(store.getActions()).toEqual(expected))
  });

  it("Failed Register. Dispatch Register Failure", ()=>{
    fetchMock.mock("*",{
      body: JSON.stringify("Result: Failure"),
      headers: {"content-type": "application.json"}
    })

    const expected = [
      {
        type: ActionTypes.REGISTER_FAILURE
      }
    ]

    const store = mockStore(initialState.greenBeanAPI);
    return store
    .dispatch(
      Actions.Register("testemail@test.com","testPassword1%","testPassword1%")
    )
    .then(()=>expect(store.getActions()).toEqual(expected))
  })
})
