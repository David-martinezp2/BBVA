import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../component/Button/Button';
import styles from './Game.module.css';
import { Box } from '@mui/material';
const Game: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [autoClickers, setAutoClickers] = useState<number>(0);
  const [megaClickers, setMegaClickers] = useState<number>(0); // Estado para los megaClickers
  const [autoClickerMultiplier, setAutoClickerMultiplier] = useState<number>(1); // Multiplicador por defecto
  const playerName = localStorage.getItem('playerName');
  const navigate = useNavigate();
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Para guardar el intervalo

  // Utilizar el nombre del jugador para generar una clave única
  const playerKey = `player_${playerName}`;

  // Cargar el estado del jugador desde localStorage al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem(playerKey);
    if (savedData) {
      const { points, autoClickers, megaClickers, autoClickerMultiplier } =
        JSON.parse(savedData);
      // Solo establecer los valores si existen para evitar sobreescribir con undefined
      if (points) setPoints(points);
      if (autoClickers) setAutoClickers(autoClickers);
      if (megaClickers) setMegaClickers(megaClickers);
      if (autoClickerMultiplier)
        setAutoClickerMultiplier(autoClickerMultiplier);
    }
  }, [playerKey]);

  // Guardar todos los datos del jugador en localStorage cuando cambien
  useEffect(() => {
    const playerData = {
      points,
      autoClickers,
      megaClickers,
      autoClickerMultiplier,
    };
    localStorage.setItem(playerKey, JSON.stringify(playerData));
  }, [points, autoClickers, megaClickers, autoClickerMultiplier, playerKey]);

  // Manejar el efecto de los autoclickers
  useEffect(() => {
    if (autoClickers > 0 || megaClickers > 0) {
      intervalRef.current = setInterval(() => {
        const megaClickerPoints = megaClickers * 10; // Cada megaClicker genera 10 veces más puntos
        setPoints(
          (prevPoints) =>
            prevPoints +
            autoClickers * autoClickerMultiplier +
            megaClickerPoints
        );
      }, 100);
    }

    // Limpiar el intervalo cuando se desmonte el componente o cambien las dependencias
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoClickers, megaClickers, autoClickerMultiplier]);

  const handleAddPoint = () => {
    setPoints(points + 1);
  };

  const handleBuyAutoClicker = () => {
    const autoClickerCost = 10 + 10 * autoClickers;
    if (points >= autoClickerCost) {
      setPoints(points - autoClickerCost);
      setAutoClickers(autoClickers + 1);
    }
  };

  const handleBuyUpgrade = () => {
    const upgradeCost = 100; // El costo de la mejora puede aumentar en función de tus reglas
    if (points >= upgradeCost) {
      setPoints(points - upgradeCost);
      setAutoClickerMultiplier(autoClickerMultiplier + 1); // Aumentar el multiplicador
    }
  };

  const handleBuyMegaClicker = () => {
    const megaClickerCost = 500; // Precio base del megaClicker
    if (points >= megaClickerCost) {
      setPoints(points - megaClickerCost);
      setMegaClickers(megaClickers + 1);
    }
  };

  const handleExitGame = () => {
    navigate('/');
  };

  const formatNumber = (num: number): string => {
    if (num >= 1e9) {
      return (num / 1e9).toFixed(2) + 'g';
    } else if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + 'm';
    } else if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + 'k';
    } else {
      return num.toString();
    }
  };

  return (
    <Box className={styles.container}>
      <h1>¡Hola {playerName}!</h1>
      <p>Puntos: {formatNumber(points)}</p>
      <Box className={styles.buttonContainer}>
        <Button onClick={handleAddPoint}>Ganar punto</Button>
        <Button
          onClick={handleBuyAutoClicker}
          disabled={points < 10 + 10 * autoClickers}
        >
          Comprar AutoClicker ({formatNumber(autoClickers)})
        </Button>
        <Button onClick={handleBuyUpgrade} disabled={points < 100}>
          Comprar Mejora (Multiplicador x{autoClickerMultiplier})
        </Button>
        <Button onClick={handleBuyMegaClicker} disabled={points < 500}>
          Comprar MegaClicker ({megaClickers})
        </Button>
        <Button onClick={handleExitGame}>Salir</Button>
      </Box>
    </Box>
  );
};

export default Game;
