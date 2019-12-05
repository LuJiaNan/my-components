import * as React from 'react';
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Step from './pages/step'
import Add from './pages/index'
import Mota from './components/Mota/index'
function App() {
  return (
    <Router>
        <Route path="/" exact={true} component={Add}/>
        <Route path="/:path" component={Step}/>
        <Route path="/mota" component={Mota}/>
    </Router>
  );
}

export default App;
