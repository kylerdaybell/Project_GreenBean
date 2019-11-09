import * as initial from "./initialState";
import * as ActionTypes from "./constants";

export const greenBeanAPIReducer = (state, action) => {
    state = state || initial.greenBeanAPI;

    if(action.type = ActionTypes.SEARCH_BY_INGREDIENT_SUCCESS){
        return {...state, recipes: action.recipes}
    }

    return state;
}