import React from "react";
import axios from "./axios";
import BioEditor from "./bioeditor";
import { render, waitForElement, fireEvent } from "@testing-library/react";

jest.mock("./axios");

//works
test("when no bio in state and textArea is not visible, render div with class 'no-bio'", () => {
    const { container } = render(<BioEditor bio="" textAreaVisible={false} />);

    expect(
        container.querySelector("div").firstChild.getAttribute("class")
    ).toBe("no-bio");
});

//expects "writebio", recieves "no-bio"
test("when no bio in state & text area visible: render div with class 'writebio'", () => {
    const { container } = render(<BioEditor bio="" textAreaVisible={true} />);

    expect(
        container.querySelector("div").firstChild.getAttribute("class")
    ).toBe("writebio");
});

//works
test("when bio in state & text area not visible: render div with class 'savedbio'", () => {
    const { container } = render(
        <BioEditor bio="a bio" textAreaVisible={false} />
    );

    expect(
        container.querySelector("div").firstChild.getAttribute("class")
    ).toBe("savedbio");
});

//expects "editbio", receives "savedbio"
test("when bio in state & text area visible: render div with class 'editbio'", () => {
    const { container } = render(
        <BioEditor bio="a bio" textAreaVisible={true} />
    );

    expect(
        container.querySelector("div").firstChild.getAttribute("class")
    ).toBe("editbio");
});

//works
test("clicking tell us about yourself button causes text area to be visible and renders a save button", () => {
    const { container } = render(<BioEditor bio="" />);
    fireEvent.click(container.querySelector("button"));

    let saveButton = container.getElementsByTagName("button");
    expect(saveButton[0].innerHTML).toBe("Save your profile");
    let textAreaVisible = container.getElementsByTagName("textarea");

    expect(textAreaVisible.length).toBe(1);
});

// expects "a bio", recieves "undefined"
test("clicking 'Save yourprofile' button triggers an axios request.", async () => {
    const { container } = render(<BioEditor />);

    fireEvent.click(container.querySelector("button"));

    axios.post.mockResolvedValue({
        data: {
            draftBio: "a bio"
        }
    });

    const elem = await waitForElement(() =>
        container.getElementsByClassName("bio-display")
    );

    expect(elem.innerHTML).toBe("a bio");
});
