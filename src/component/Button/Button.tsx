import React from 'react';
import style from './Button.module.css';
interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode; // El contenido del botón (texto, iconos, etc.)
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled = false,
  children,
}) => {
  return (
    <button className={style.button} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
