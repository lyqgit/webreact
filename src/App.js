import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter as Router,Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';


class App extends Component {
  render() {
    return (
    <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">美拍活动后台</h1>
        </header>
          <Route exact path="/" component={Login}/>
          <Route path="/Login" component={Login}/>
          <Route path="/Home" component={Home}/>
      </div>



    </Router>
    );
  }
}

export default App;
