// Test away
import React from "react";
import renderer from "react-test-renderer"; // 1: install this npm module as a dev dependency
import { render, fireEvent } from "react-testing-library";
import "jest-dom/extend-expect";

const clickNTimes = elm => n => {
  for (let i = 0; i < n; i++) {
    fireEvent.click(elm);
  }
};

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

  it("changes the display to close after clicking on the close button", () => {
    const { getByText } = render(<Dashboard />);
    const closeButton = getByText(/close gate/i);
    const closedStatus = getByText("Open");

    fireEvent.click(closeButton);

    expect(closedStatus.textContent).toBe("Closed");
  });

  it("changes the display to open after clicking on the close button twice", () => {
    const { getByText } = render(<Dashboard />);
    const closeButton = getByText(/close gate/i);
    const closedStatus = getByText("Open");

    clickNTimes(closeButton)(2);

    expect(closedStatus.textContent).toBe("Open");
  });

  it("enables the lock the gate button once it's closed", () => {
    const { getByText } = render(<Dashboard />);
    const closeButton = getByText(/close gate/i);
    const lockButton = getByText("Lock Gate");

    fireEvent.click(closeButton);

    expect(lockButton).toBeEnabled();
  });
  it("disables the open gate button once it's locked", () => {
    const { getByText } = render(<Dashboard />);
    const closeButton = getByText(/close gate/i);
    const lockButton = getByText("Lock Gate");

    fireEvent.click(closeButton);
    fireEvent.click(lockButton);

    const openButton = getByText(/open gate/i);
    expect(openButton).toBeDisabled();
  });
});
