import * as actions from "./index";
import * as types from "../constants/action-types";

describe("actions", () => {
    it("should create an action to init from saved", () => {
        const value = "some expected value";
        expect(actions.initFromSaved(value)).toEqual({
            type: types.INIT_FROM_SAVED,
            value,
        });
    });

    it("should create an action to edit content", () => {
        const value = "some value";
        const element = "some element"
        expect(actions.editContent(element, value)).toEqual({
            type: types.EDIT_CONTENT,
            element: element,
            content: value
        });
    });
});
