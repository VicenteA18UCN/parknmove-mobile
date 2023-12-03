import React from "react";
import renderer, { act } from "react-test-renderer";
import RootStack from "../../../navigators/RootStack";
import { render, fireEvent } from "@testing-library/react-native";


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
  test("login with incorrect username and password", async () => {
    const { getByPlaceholderText, getByText } = render(<RootStack />);

    const emailInput = getByPlaceholderText("a@gmail.com");
    const passwordInput = getByPlaceholderText("**********");
    const submitButton = getByText("Iniciar Sesión");

    await act(async () => {
      fireEvent.changeText(emailInput, "incorrect@gmail.com");
      fireEvent.changeText(passwordInput, "incorrectPassword");
      fireEvent.press(submitButton);
    });

    await waitFor(() =>
      expect(getByText("Error al iniciar sesión")).toBeDefined()
    );
  });
});
