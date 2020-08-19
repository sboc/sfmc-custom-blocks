import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import store from "../store/index";
import Article from "./Article";

let container = null;
beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

test("Render article ipnuts correctly", () => {
    act(() => {
        render(<Provider store={store}><Article /></Provider>, container);
    });

    const labels = container.querySelectorAll("label");
    const inputs = container.querySelectorAll("input");
    const textareas = container.querySelectorAll("textarea");

    expect(labels.length).toBe(4);
    expect(inputs.length).toBe(2);
    expect(textareas.length).toBe(2);

    expect(labels[0].textContent).toBe("Headline");
    expect(labels[1].textContent).toBe("Text Body");
    expect(labels[2].textContent).toBe("Choose Headline Color");
    expect(labels[3].textContent).toBe("Rich Text");
});
