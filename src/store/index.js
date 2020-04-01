import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
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

const composeEnhancers = composeWithDevTools({
    trace: true,
    traceLimit: 25
});
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(setDataMiddleware)));
export default store;
