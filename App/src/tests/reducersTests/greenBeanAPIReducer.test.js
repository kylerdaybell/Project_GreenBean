import * as Reducer from "../../store/reducers";
import * as resultActions from "../../store/actions/resultActions";
import * as ActionTypes from "../../store/constants";
import * as Actions from "../../store/actions/actions"
import recipesByIngredientMock from "../../testMockData/mockData";
import * as initialState from "../../store/initialState";
//empty offlineAPI mock for actions
jest.mock("../../Services/OfflineAPI.js", () => () => ({}));

test("should add recipes when SearchByIngredientSuccess is called", () => {
    const testState = initialState.greenBeanAPI;
    const recipes = recipesByIngredientMock;
    const action = resultActions.SearchByIngredientSuccess(recipes);
  
    const expectedState = {
      ...initialState.greenBeanAPI,
      recipes: recipes
    };
    const expectedActionType = ActionTypes.SEARCH_RECIPE_SUCCESS;
  
    const actualState = Reducer.greenBeanAPIReducer(testState, action);
    const actualActionType = action.type;
  
    expect(actualState).toEqual(expectedState);
    expect(actualActionType).toEqual(expectedActionType);
  });
  
  test("should add recipes when SearchByNameSuccess is called", () => {
    const testState = initialState.greenBeanAPI;
    const recipes = recipesByIngredientMock;
    const action = resultActions.SearchByNameSuccess(recipes);
  
    const expectedState = {
      ...initialState.greenBeanAPI,
      recipes: recipes
    };
    const expectedActionType = ActionTypes.SEARCH_RECIPE_SUCCESS;
  
    const actualState = Reducer.greenBeanAPIReducer(testState, action);
    const actualActionType = action.type;
  
    expect(actualState).toEqual(expectedState);
    expect(actualActionType).toEqual(expectedActionType);
  });
  
  test("should add recipes when SearchByCategorySuccess is called", () => {
    const testState = initialState.greenBeanAPI;
    const recipes = recipesByIngredientMock;
    const action = resultActions.SearchByCategorySuccess(recipes);
  
    const expectedState = {
      ...initialState.greenBeanAPI,
      recipes: recipes
    };
    const expectedActionType = ActionTypes.SEARCH_RECIPE_SUCCESS;
  
    const actualState = Reducer.greenBeanAPIReducer(testState, action);
    const actualActionType = action.type;
  
    expect(actualState).toEqual(expectedState);
    expect(actualActionType).toEqual(expectedActionType);
  });
  
  test("should remove recipe when DeleteRecipeSuccess is called", () => {
    const testState = {
      ...initialState.greenBeanAPI,
      recipes: recipesByIngredientMock,
      homePageRecipes: recipesByIngredientMock
    };
    const recipeId = 2;
    const filteredRecipes = recipesByIngredientMock.filter(r=>r.recipe.id !== recipeId);
    const action = resultActions.DeleteRecipeSuccess(recipeId);
  
    const expectedState = {
      ...initialState.greenBeanAPI,
      recipes: filteredRecipes,
      homePageRecipes: filteredRecipes
    };
    const expectedActionType = ActionTypes.DELETE_RECIPE_SUCCESS;
  
    const actualState = Reducer.greenBeanAPIReducer(testState, action);
    const actualActionType = action.type;
  
    expect(actualState).toEqual(expectedState);
    expect(actualActionType).toEqual(expectedActionType);
  });
  
  test("should add recipes when GetTopTenRecipesSuccess is called", () => {
    const testState = initialState.greenBeanAPI;
    const recipes = recipesByIngredientMock;
    const action = resultActions.GetTopTenRecipesSuccess(recipes);
  
    const expectedState = {
      ...initialState.greenBeanAPI,
      homePageRecipes: recipes
    }
    const expectedActionType = ActionTypes.GET_TOP_TEN_SUCCESS;
  
    const actualState = Reducer.greenBeanAPIReducer(testState, action);
    const actualActionType = action.type;
  
    expect(actualState).toEqual(expectedState);
    expect(actualActionType).toEqual(expectedActionType);
  })

  test("should switch mode when ChangeMode is called", () => {
      const testState = initialState.greenBeanAPI;
      const currentMode = testState.offlineMode;
      const action = Actions.ChangeMode(currentMode);

      const expectedState = {
          ...initialState.greenBeanAPI,
          offlineMode: !currentMode
      }
      const expectedActionType = ActionTypes.CHANGE_MODE;

      const actualState = Reducer.greenBeanAPIReducer(testState, action);
      const actualActionType = action.type;

      expect(actualState).toEqual(expectedState);
      expect(actualActionType).toEqual(expectedActionType);
  })