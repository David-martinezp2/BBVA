import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../../component/Button';
import Input from '../../component/Input';

const Home: React.FC = () => {
  const [playerName, setPlayerName] = useState('');
  const navigate = useNavigate();

  const handleStartGame = () => {
    if (playerName.trim()) {
      localStorage.setItem('playerName', playerName); // Guardar el nombre
      navigate('/game');
    } else {
      alert('Por favor, introduce un nombre válido.');
    }
  };

  return (
    <div>
      <h1>¡Bienvenido al Juego!</h1>
      <Input
        type='text'
        placeholder='Introduce tu nombre'
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <Button onClick={handleStartGame}>Iniciar Juego</Button>
      <Link to='/ranking'>Ver Ranking</Link> {/* Enlace al ranking */}
    </div>
  );
};

export default Home;
