import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Logout extends Component {
	handleLogout = (e) => {
		e.preventDefault();
		// TO DO: DELETE TOKEN FROM LOCAL STORAGE
		// GO BACK TO HOME PAGE
		console.log('Logout function called');
	}

	render() {
		return(
			<Link to="/" onClick={this.handleLogout}>Logout</Link>
		);
	}
}

export default Logout;