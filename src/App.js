import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import NotFound from './components/NotFound';
import Waiters from './components/waiters/Waiters/Waiters';
import Tables from './components/tables/Tables/Tables';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-header">
          <Link to="/">Home</Link>
          <Link to="/waiters">Waiters</Link>
          <Link to="/tables">Tables</Link>
        </div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/waiters">
            <Waiters />
          </Route>
          <Route path="/tables">
            <Tables />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
