import React, { Component} from 'react';
import NavBar from './components/NavBar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import FlashCard from './components/FlashCard';

class App extends Component {
  
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/flashcard/:card_id" component={FlashCard}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
