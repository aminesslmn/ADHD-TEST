import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GeneralInfo from './components/GeneralInfo';
import ADHDTest from './components/ADHDTest';
import Game from './components/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GeneralInfo />} />
        <Route path="/adhd-test" element={<ADHDTest />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;