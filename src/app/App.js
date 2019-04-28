import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";

import { history } from './helpers/history';

import './App.scss';

import Pages from './pages/Pages';

function App() {
  return (
    <Router history={history} className="app">
      <Pages history={history}/>
    </Router>
  );
}

export default App;
