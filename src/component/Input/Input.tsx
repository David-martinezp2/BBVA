import React from 'react';
import styles from './Input.module.css';
interface InputProps {
  value: string; // El valor del input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Función que se ejecuta al cambiar el valor
  placeholder?: string; // Placeholder opcional
  type?: string; // Tipo de input (por defecto es 'text')
  disabled?: boolean; // Si el input está deshabilitado o no
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  disabled = false,
}) => {
  return (
    <input
      className={styles.input}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  );
};

export default Input;
