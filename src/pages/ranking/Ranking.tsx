import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "../../component/Button";

interface Player {
  name: string;
  points: number;
}

const Ranking: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const playersList: Player[] = [];

    // Recuperar todos los datos de los jugadores guardados en localStorage
    for (const key in localStorage) {
      if (key.startsWith('player_')) {
        const playerData = localStorage.getItem(key);
        if (playerData) {
          const { points } = JSON.parse(playerData);
          const playerName = key.replace('player_', '');
          playersList.push({ name: playerName, points });
        }
      }
    }

    // Ordenar jugadores por puntaje más alto
    playersList.sort((a, b) => b.points - a.points);
    setPlayers(playersList);
  }, []);

  const handleExitGame = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Ranking de Jugadores</h1>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {index + 1}. {player.name} - {player.points} puntos
          </li>
        ))}
      </ul>
      <Button onClick={handleExitGame}>Volver a Home</Button>
    </div>
  );
};

export default Ranking;
