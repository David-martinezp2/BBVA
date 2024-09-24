// Game.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Importar MemoryRouter
import Game from './Game';
import '@testing-library/jest-dom';

test('muestra los puntos iniciales', () => {
  render(
    <MemoryRouter>
      {' '}
      {/* Envuelve el componente dentro de MemoryRouter */}
      <Game />
    </MemoryRouter>
  );
  const pointsElement = screen.getByText(/Puntos:/i);
  expect(pointsElement).toBeInTheDocument();
  expect(pointsElement).toHaveTextContent('Puntos: 0'); // Puntos iniciales
});

test('incrementa los puntos al hacer clic en el botón', () => {
  render(
    <MemoryRouter>
      {' '}
      {/* Envuelve el componente dentro de MemoryRouter */}
      <Game />
    </MemoryRouter>
  );
  const buttonElement = screen.getByRole('button', { name: /ganar punto/i });

  fireEvent.click(buttonElement); // Simular un clic
  const pointsElement = screen.getByText(/Puntos:/i);
  expect(pointsElement).toHaveTextContent('Puntos: 1'); // Después del clic, los puntos deben ser 1
});

test('muestra el botón de autoclickers deshabilitado al inicio', () => {
  render(
    <MemoryRouter>
      {' '}
      {/* Envuelve el componente dentro de MemoryRouter */}
      <Game />
    </MemoryRouter>
  );
  const autoClickerButton = screen.getByRole('button', {
    name: /comprar autoclicker/i,
  });
  expect(autoClickerButton).toBeDisabled(); // Al inicio debe estar deshabilitado
});

test('habilita el botón de autoclickers cuando hay suficientes puntos', () => {
  render(
    <MemoryRouter>
      {' '}
      {/* Envuelve el componente dentro de MemoryRouter */}
      <Game />
    </MemoryRouter>
  );
  const buttonElement = screen.getByRole('button', { name: /ganar punto/i });
  const autoClickerButton = screen.getByRole('button', {
    name: /comprar autoclicker/i,
  });

  // Simulamos clics hasta tener puntos suficientes
  for (let i = 0; i < 10; i++) {
    fireEvent.click(buttonElement);
  }

  expect(autoClickerButton).toBeEnabled(); // Debe habilitarse después de tener suficientes puntos
});
