// src/App.tsx

import React from 'react';
import './App.css';
import GithubSearch from './GithubSearch'; // ここを修正

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub Search engine</h1>
      </header>
      <GithubSearch />
    </div>
  );
}

export default App;
