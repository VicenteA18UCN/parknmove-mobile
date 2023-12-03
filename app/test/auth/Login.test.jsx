import React from "react";
import renderer from "react-test-renderer";
import RootStack from "../../../navigators/RootStack";
import { render } from "@testing-library/react-native";

describe("Login", () => {
  test("render Login", () => {
    const { getByText } = render(<RootStack />);
    const element = getByText("ParknMove");
    expect(element).toBeDefined();
  });
  test("render Login form", () => {
    const { getByPlaceholderText } = render(<RootStack />);
    const emailInput = getByPlaceholderText("a@gmail.com");
    const passwordInput = getByPlaceholderText("**********");

    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
  });
});
