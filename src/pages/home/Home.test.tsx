// Home.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';
import '@testing-library/jest-dom'; // Para las aserciones como toBeInTheDocument()

test('debe mostrar el título correctamente', () => {
  render(<Home />);
  const titleElement = screen.getByText(/¡Bienvenido al Juego!/i);
  expect(titleElement).toBeInTheDocument();
});

test('debe mostrar el botón de iniciar juego', () => {
  render(<Home />);
  const buttonElement = screen.getByRole('button', { name: /iniciar juego/i });
  expect(buttonElement).toBeInTheDocument();
});
