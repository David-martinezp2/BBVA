// App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('redirecciona a la página home si la ruta no existe', () => {
  render(<App />); // No es necesario envolver con MemoryRouter si App ya tiene un Router dentro.

  expect(screen.getByText(/¡Bienvenido al Juego!/i)).toBeInTheDocument();
});
