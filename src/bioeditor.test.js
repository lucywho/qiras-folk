import React from "react";
import axios from "./axios";
import BioEditor from "./bioeditor";
import { render, waitForElement, fireEvent } from "@testing-library/react";

jest.mock("./axios");

test("when no bio in state and textArea is not visible, render div with class 'no-bio'", () => {
    const { container } = render(<BioEditor bio="" textAreaVisible={false} />);

    expect(
        container.querySelector("div").firstChild.getAttribute("class")
    ).toBe("no-bio");
}); //works

test("when no bio in state & text area visible: render div with class 'writebio'", () => {
    const { container } = render(<BioEditor bio="" textAreaVisible={true} />);

    expect(
        container.querySelector("div").firstChild.getAttribute("class")
    ).toBe("writebio");
}); //renders no-bio

test("when bio in state & text area not visible: render div with class 'savedbio'", () => {
    const { container } = render(
        <BioEditor bio="a bio" textAreaVisible={false} />
    );

    expect(
        container.querySelector("div").firstChild.getAttribute("class")
    ).toBe("savedbio");
}); //works

test("when bio in state & text area visible: render div with class 'editbio'", () => {
    const { container } = render(
        <BioEditor bio="a bio" textAreaVisible={true} />
    );

    expect(
        container.querySelector("div").firstChild.getAttribute("class")
    ).toBe("editbio");
}); //renders savedbio
