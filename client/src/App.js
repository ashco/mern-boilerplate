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
      console.log('non-empty token', token);
      axios.post('/auth/me/from/token', {
        token: token
      }).then((result) => {
        console.log('Success', result);
        // TODO: IF VALID USER OBJECT IS RETURNED, ASSIGN IT TO STATE 
        if(result){ //User was found
          localStorage.setItem('mernToken', result.data.token);
          this.setState({
            token: result.data.token,
            user: result.data.user
          });
        }
        else { //Nothing returned?
          this.setState({
            token: '',
            user: null
          });
        }
      }).catch((error) => {
        console.log('Error', error);
        localStorage.removeItem('mernToken');
        this.setState({
          token: '',
          user: null
        });
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
            <Route exact path="/signup" component={
              () => (<Signup user={this.state.user} updateUser={this.loadUser} />)
            } />
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
