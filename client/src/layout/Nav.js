import React, { Component } from 'react';
// THIS GETS AROUND PAGE RELOAD
import { Link } from 'react-router-dom';
import Logout from '../auth/Logout.js';
import logo from '../logo.svg';


class Nav extends Component {
	render(){
		return(
			<div>

				<nav className="nav">
					<Link to="/">Home</Link>
					<Link to="/login">Login</Link>
					<Link to="/signup">Sign Up</Link>
					<Link to="/profile">Profile</Link>
					<Logout />
				</nav>


				<header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Mongo Express React Node</h1>
        </header>
			</div>
		);
	}
}

export default Nav;