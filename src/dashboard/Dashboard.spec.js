// Test away
import React from "react";
import renderer from "react-test-renderer"; // 1: install this npm module as a dev dependency
import { render, fireEvent } from "react-testing-library";

import Dashboard from "./Dashboard";
describe("<Dashboard/>", () => {
  it("renders without crashing", () => {
    // Render new instance in every test to prevent leaking state
    render(<Dashboard />);
  });

  it("matches snapshot", () => {
    const tree = renderer.create(<Dashboard />); // generates a DOM tree
    // snapshots are a JSON representation of the DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
