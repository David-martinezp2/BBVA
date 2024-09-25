import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Home from './Home';

// Mock para `useNavigate`
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('Home Component', () => {
  beforeEach(() => {
    localStorage.clear(); // Limpiar el localStorage antes de cada prueba
    mockedNavigate.mockClear(); // Limpiar el mock de navegación
  });

  test('muestra el título y el input inicial', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Verificar que el título se muestra correctamente
    expect(screen.getByText('¡Bienvenido al Juego!')).toBeInTheDocument();

    // Verificar que el input está presente y vacío
    const inputElement = screen.getByPlaceholderText('Introduce tu nombre');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('');
  });

  test('actualiza el valor del input cuando el usuario escribe', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Obtener el input
    const inputElement = screen.getByPlaceholderText('Introduce tu nombre');

    // Simular el cambio en el input
    fireEvent.change(inputElement, { target: { value: 'PlayerTest' } });

    // Verificar que el valor del input ha cambiado
    expect(inputElement).toHaveValue('PlayerTest');
  });

  test('navega al juego cuando se introduce un nombre válido', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Simulamos escribir el nombre en el input
    const inputElement = screen.getByPlaceholderText('Introduce tu nombre');
    fireEvent.change(inputElement, { target: { value: 'PlayerTest' } });

    // Simulamos hacer clic en el botón "Iniciar Juego"
    const startButton = screen.getByText('Iniciar Juego');
    fireEvent.click(startButton);

    // Verificar que el nombre se guarda en el localStorage
    expect(localStorage.getItem('playerName')).toBe('PlayerTest');

    // Verificar que se navega a la ruta del juego
    expect(mockedNavigate).toHaveBeenCalledWith('/game');
  });

  test('muestra una alerta si se intenta iniciar el juego sin un nombre válido', () => {
    // Mock de window.alert para pruebas
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    // Simulamos hacer clic en el botón "Iniciar Juego" sin escribir un nombre
    const startButton = screen.getByText('Iniciar Juego');
    fireEvent.click(startButton);

    // Verificar que se muestra una alerta
    expect(alertMock).toHaveBeenCalledWith(
      'Por favor, introduce un nombre válido.'
    );

    // Restaurar el mock de alert
    alertMock.mockRestore();
  });
});
