import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.scss';

const User = ({ match }) => <h1>User info {match.params.username}</h1>;

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/block">Block</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
          </ul>
          <Route path="/" exact render={() => <h1 className="header">Bitcoin blocks</h1>} />

          <Route path="/block" exact render={() => <h1 className="header">Specific block details</h1>} />

          <Route path="/user/:username" exact component={User} />
        </div>
      </BrowserRouter>
    );
  }
}
