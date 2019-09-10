import React, { Component} from 'react';
import NavBar from './components/NavBar';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';
import { Provider } from 'react-redux'
import store from './store'

class App extends Component {
 
  componentDidMount(){
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <div className="header">
              <div className="header-text">
                <span style={{fontWeight: 'lighter'}}>Flashcard <span style={{fontWeight: 'bolder'}}>Builder</span></span>
              </div>
              <NavBar />
            </div>
            <Switch>
              <Route exact path="/flashcard/" component={Home}/>
              <Route path="/flashcard/register" component={Register}/>
              <Route path="/flashcard/:username" component={Profile}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
