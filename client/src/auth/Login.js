import React, { Component } from 'react';
import axios from 'axios';
import { request } from 'https';

class Login extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: ''
		}
	}
	
	handleEmailChange = (e) => {
		this.setState({ email: e.target.value });
	}

	handlePasswordChange = (e) => {
		this.setState({ password: e.target.value });
	}

	handleFormSubmit = (e) => {
		e.preventDefault();
		console.log('form was submitted');
		// TO DO: USE AXIOS TO CALL SERVER AND ATTEMPT TO LOGIN
		axios.post('/auth/login', {
			email: this.state.email,
			password: this.state.password
			// NOTE: EXPECT TO RECEIVE TOKEN BACK FROM SERVER ON SUCCESS
		}).then(result => {
			console.log('Success', result);
			// NOTE: MAKE SURE TO HANDLE ERROR MESSAGES ON FAILURE
			// REDIRECT TO PROFILE
		}).catch(error => {
			console.log('Error', error);
		});

	}

	render() {
		return(
			<form onSubmit={this.handleFormSubmit}>
				<div>
					<label>User Name: </label>
					<input type="text" name="Email" placeholder="Your Email" value={this.state.email} onChange={this.handleEmailChange} />
				</div>
				<div>
					<label>Password: </label>
					<input type="password" name="Password" placeholder="Please Password" value={this.state.password} onChange={this.handlePasswordChange} />
				</div>
				<input className="btn" type="submit" value="Login" />
			</form>
		);
	}
}

export default Login;