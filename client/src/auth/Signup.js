import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Signup extends Component {
	constructor(props){
		super(props);
		this.state = {
			email: '',
			name: '',
			password: ''
		}
	}
	
	handleChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

	handleFormSubmit = (e) => {
		e.preventDefault();
		console.log('form submitted', this.state);
		// USE AXIOS TO CALL SERVER AND ATTEMPT TO SIGN UP
		axios.post('/auth/signup', {
			name: this.state.name,
			email: this.state.email,
			password: this.state.password
		}).then(result => {
			console.log('Response from server', result);
			localStorage.setItem('mernToken', result.data.token);
			this.props.updateUser();
		}).catch(error => {
			console.log('############Error Aquired', error);
		});
		// NOTE: EXPECT TO RECEIVE TOKEN BACK FROM SERVER ON SUCCESS
		// NOTE: MAKE SURE TO HANDLE ERROR MESSAGES ON FAILURE
		// REDIRECT TO PROFILE
	}

	
	render() {
		if(this.props.user){
			return (<Redirect to="/profile" />)
		}
		else {
			return(
				<div className="form-box">
					<form onSubmit={this.handleFormSubmit}>
						<div>
							<label>User Name: </label>
							<input type="text" name="email" placeholder="Your Email" onChange={this.handleChange} />
						</div>
						<div>
							<label>Name: </label>
							<input type="text" name="name" placeholder="Who are you?" value={this.state.name} onChange={this.handleChange} />
						</div>
						<div>
							<label>Password: </label>
							<input type="password" name="password" placeholder="Please Password" value={this.state.password} onChange={this.handleChange} />
						</div>
						<input className="btn" type="submit" value="Login" />
					</form>
				</div>
			);
		}
	}
}

export default Signup;