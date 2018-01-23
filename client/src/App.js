import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; 
import axios from 'axios';
import Nav from './layout/Nav.js';
import Login from './auth/Login.js';
import Signup from './auth/Signup.js';
import Home from './Home.js';
import Profile from './Profile.js';
import Footer from './layout/Footer.js';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      token: '',
      user: null
    }
  }

  componentDidMount = () => {
    this.loadUser();
  }

  loadUser = () => {
    console.log('loading user');
    const token = localStorage.getItem('mernToken');
    // IF TOKEN IS AROUND
    if(token){
      console.log('valid token', token);
      axios.post('/auth/me/from/token', {
        token: token
      }).then((result) => {
        console.log('Success', result);
        // TODO: IF VALID USER OBJECT IS RETURNED, ASSIGN IT TO STATE 
      }).catch((error) => {
        console.log('Error', error);
      });
    }
    else {
      this.setState({
        token: '',
        user: null
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
        <div>
          <Nav />
            <div className="content">
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            </div>
          </div>
        </Router>
        <Footer />
      </div>
    );
  }
}

export default App;
