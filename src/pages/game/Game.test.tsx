import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Necesitamos envolver el componente en un Router
import Game from './Game';

// Mocks para `localStorage` y `useNavigate`
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Game Component', () => {
  beforeEach(() => {
    localStorage.clear(); // Limpiar el localStorage antes de cada prueba
  });

  test('muestra los puntos iniciales y el nombre del jugador', () => {
    // Simulamos un nombre en el localStorage
    localStorage.setItem('playerName', 'PlayerTest');

    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    // Verificamos que el nombre del jugador se muestre correctamente
    expect(screen.getByText('¡Hola PlayerTest!')).toBeInTheDocument();
    // Verificamos que los puntos iniciales sean 0
    expect(screen.getByText('Puntos: 0')).toBeInTheDocument();
  });

  test('incrementa los puntos al hacer clic en "Ganar punto"', () => {
    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    // Obtenemos el botón para ganar puntos
    const addButton = screen.getByText('Ganar punto');

    // Hacemos clic en el botón
    fireEvent.click(addButton);

    // Verificamos que los puntos han aumentado
    expect(screen.getByText('Puntos: 1')).toBeInTheDocument();
  });

  test('comprar autoclicker deshabilitado cuando no hay suficientes puntos', () => {
    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    // Verificamos que el botón para comprar autoclickers esté deshabilitado al inicio
    const autoClickerButton = screen.getByText(/Comprar AutoClicker/i);
    expect(autoClickerButton).toBeDisabled();
  });

  test('habilita el botón de autoclicker después de obtener suficientes puntos', () => {
    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    // Simulamos clics suficientes para comprar un autoclicker
    const addButton = screen.getByText('Ganar punto');
    for (let i = 0; i < 20; i++) {
      fireEvent.click(addButton);
    }

    // Ahora el botón de autoclicker debe estar habilitado
    const autoClickerButton = screen.getByText(/Comprar AutoClicker/i);
    expect(autoClickerButton).not.toBeDisabled();
  });

  test('navega a la página de inicio al hacer clic en el botón de "Salir"', () => {
    render(
      <MemoryRouter>
        <Game />
      </MemoryRouter>
    );

    const exitButton = screen.getByText('Salir');
    fireEvent.click(exitButton);

    // Verificamos que se ha llamado a la función de navegación
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });
});
