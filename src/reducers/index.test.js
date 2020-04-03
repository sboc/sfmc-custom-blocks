import rootReducer from "./index";
import * as types from "../constants/action-types";

describe("content reducer", () => {
    const initialState = {
        content: {},
    };

    it("should return the initial state", () => {
        expect(rootReducer(undefined, {})).toEqual(initialState);
    });

    it("should edit some content", () => {
        const value = "some value";
        expect(
            rootReducer(initialState, {
                type: types.EDIT_CONTENT,
                element: "noget",
                content: value,
            })
        ).toEqual({
            content: {
                noget: value,
            },
        });
    });
});
