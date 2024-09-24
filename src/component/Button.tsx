import React from 'react';

// Definimos el tipo de los props que el botón aceptará
interface ButtonProps {
  onClick: () => void; // Función que se ejecutará al hacer clic
  disabled?: boolean; // Si el botón está deshabilitado o no
  children: React.ReactNode; // El contenido del botón (texto, iconos, etc.)
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
