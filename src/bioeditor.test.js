import React from "react";
import axios from "./axios";
import { BioEditor } from "./bioeditor";
import { render, waitForElement, fireEvent } from "@testing-library/react";

jest.mock("./axios");

test("when no bio rendered, show Tell us about yourself button", () => {
    const { container } = render(<BioEditor bio="" />);

    expect(container.querySelector(".bioedidiv").getAttribute("button")).toBe(
        "Tell us about yourself"
    );
});
