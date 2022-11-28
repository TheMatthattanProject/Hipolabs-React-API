import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import { TableScreen } from './screens/TableScreen';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TableScreen/>
        
        
      </header>
    </div>
  );
}

export default App;
