// Test away!
import React from "react";
import renderer from "react-test-renderer"; // 1: install this npm module as a dev dependency
import { render, cleanup } from "react-testing-library";
afterEach(cleanup);

import Display from "./Display";

describe("<Display/>", () => {
  it("renders without crashing", () => {
    render(<Display />);
  });

  it("matches snapshot", () => {
    const tree = renderer.create(<Display />); // generates a DOM tree

    // snapshots are a JSON representation of the DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });

  it("by default renders closed and locked to be false", () => {
    const { getByText } = render(<Display />);
    getByText(/unlocked/i);
    getByText(/open/i);
  });

  it("by default locked class is `green-led`", () => {
    const { getByText } = render(<Display />);
    const className = `led green-led`;
    const lockedDisplay = getByText(/Unlocked/i);
    expect(lockedDisplay.className).toBe(className);
  });

  it("by default closed class is `green-led`", () => {
    const { getByText } = render(<Display />);
    const className = `led green-led`;
    const closedDisplay = getByText(/open/i);
    expect(closedDisplay.className).toBe(className);
  });
});
