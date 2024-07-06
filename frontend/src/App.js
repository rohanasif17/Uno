import React from 'react';
import Game from './components/Game';
import Homepage from './components/Homepage';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Homepage />} />
        <Route path="/play" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
