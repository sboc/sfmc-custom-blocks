import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/index";

var SDK = require("blocksdk");
var sdk = new SDK({
    tabs: ["htmlblock"]
});

const setDataMiddleware = store => next => action => {
    next(action);
    let state = store.getState();
    sdk.setData({
        content: state.content
    });
};

const store = createStore(rootReducer, applyMiddleware(setDataMiddleware));
export default store;
