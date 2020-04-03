import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders article link", () => {
    const { getByText } = render(<App />);
    const linkElement = getByText(/article/i);
    expect(linkElement).toBeInTheDocument();
});
