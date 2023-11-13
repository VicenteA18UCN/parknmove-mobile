/*import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import Login from '../../../app/auth/Login';

// Mocks necesarios aquí...

describe('Pantalla de Login', () => {
  let getByPlaceholderText, queryByDisplayValue, emailInput, passwordInput;

  beforeEach(() => {
    // Usa act para manejar la resolución de estados asincrónicos
    
      ({ getByPlaceholderText, queryByDisplayValue } = render(<Login />));
    
    
    emailInput = getByPlaceholderText('a@gmail.com');
    passwordInput = getByPlaceholderText('**********');
  });

  it('renderiza el contenido de los inputs', () => {
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
  });

  it('permite ingresar un email', () => {
    act(() => {
      fireEvent.changeText(emailInput, 'test@example.com');
    });
    
    const updatedEmailInput = queryByDisplayValue('test@example.com');
    expect(updatedEmailInput).toBeTruthy();
  });

  // Más pruebas...
});
*/

import React from 'react'
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Login from '../../../app/auth/Login';


describe('Pantalla de Login', () => {
const onSubmit = jest.fn()
    
  beforeEach(()=>{
    ({ getByPlaceholderText, queryByDisplayValue } = render(<Login />));
    emailInput = getByPlaceholderText('a@gmail.com');
    passwordInput = getByPlaceholderText('**********');
    //onSubmit.mockClear()
  })

  test('Login', async () => {
    const eMail = screen.getByTestId('text-input-element')
    const password = screen.getByTestId('password-input-element')
    userEvent.type(eMail, "fillWithTestUsername")
    userEvent.type(password, "fillWithTestPassword")

    userEvent.click(screen.getByTestId('login-button-element'))

    await waitFor(()=>{
      expect(onSubmit).toHaveBeenCalledTimes(1)
    })
  })
});