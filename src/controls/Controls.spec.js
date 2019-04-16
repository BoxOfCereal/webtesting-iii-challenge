// Test away!
import React from "react";
import renderer from "react-test-renderer"; // 1: install this npm module as a dev dependency
import { render, fireEvent } from "react-testing-library";

import Controls from "./Controls";

describe("<Controls/>", () => {
  it("renders without crashing", () => {
    render(<Controls />);
  });

  it("should match snapshot", () => {
    const tree = renderer.create(<Controls />); // generates a DOM tree
    // snapshots are a JSON representation of the DOM tree
    expect(tree.toJSON()).toMatchSnapshot();
  });
});
