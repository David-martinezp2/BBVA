import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Home from '../pages/home/Home';
import Game from '../pages/game/Game';
import Ranking from '../pages/ranking/Ranking';
import { ROUTES } from './routes-constant';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.GAME} element={<Game />} />
        <Route path={ROUTES.RANKING} element={<Ranking />} />
        {/* Ruta comodín para redirigir a Home si no coincide ninguna */}
        <Route
          path={ROUTES.NOT_FOUND}
          element={<Navigate to={ROUTES.HOME} />}
        />
      </Routes>
    </Router>
  );
}

export default AppRouter;
