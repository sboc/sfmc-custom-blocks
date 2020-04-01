import { EDIT_CONTENT, INIT_FROM_SAVED } from '../constants/action-types';
import { } from '../actions/index';

const initialState = {
    content: {}
};

function rootReducer(state = initialState, action) {
    if (action.type === INIT_FROM_SAVED && action.value && Object.keys(action.value).length > 0) {
        let newState = JSON.parse(JSON.stringify(state));
        newState = action.value;
        return newState;
    }

    if (action.type === EDIT_CONTENT) {
        let newState = JSON.parse(JSON.stringify(state));
        newState.content[action.element] = action.content;
        return newState;
    }

    return state;
}

export default rootReducer;