import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import GlobalMap from './components/GlobalMap';
import Base from './components/BasePage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/test-two/" element={<GlobalMap />} />
        <Route path="/base" element={<Base />} />
      </Routes>
    </Router>
  );
};

export default App;
