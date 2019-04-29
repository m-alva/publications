import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import './App.scss';

import Pages from './pages/Pages';

function App() {
  return (
    <Router className="app">
      <Pages/>
    </Router>
  );
}

export default App;
