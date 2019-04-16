// Test away!
import React from "react";
import renderer from "react-test-renderer"; // 1: install this npm module as a dev dependency
import { render, fireEvent, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
afterEach(cleanup);

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

  it("by default displays a button with `Lock Gate`", () => {
    const { getByText } = render(<Controls />);
    getByText(/lock gate/i);
  });
  it("by default displays a button with `Close Gate`", () => {
    const { getByText } = render(<Controls />);
    getByText(/close gate/i);
  });
  it("by default lock gate is disabled", () => {
    const { getByText } = render(<Controls />);
    const lockButton = getByText(/lock gate/i);
    expect(lockButton).toBeDisabled();
  });
  it("by default close gate is enabled", () => {
    const { getByText } = render(<Controls />);
    const closeButton = getByText(/close gate/i);
    expect(closeButton).toBeEnabled();
  });

  it("should call toggleLocked on click", () => {
    const toggleLockedMock = jest.fn();
    //need to close it before locking
    const { getByText } = render(
      <Controls toggleLocked={toggleLockedMock} closed={true} />
    );

    const lockButton = getByText(/lock gate/i);
    console.log(lockButton);
    fireEvent.click(lockButton);

    expect(toggleLockedMock).toBeCalledTimes(1);
  });
  it("should call toggleClosed on click", () => {
    const toggleClosedMock = jest.fn();
    const { getByText } = render(<Controls toggleClosed={toggleClosedMock} />);

    const closeButton = getByText(/close gate/i);
    fireEvent.click(closeButton);

    expect(toggleClosedMock).toBeCalledTimes(1);
  });
});
