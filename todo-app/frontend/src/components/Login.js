import React, {Component} from "react";
import { Redirect } from 'react-router';

import { userService } from '../services/user.service';

import Content from './Content';


export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            loggedIn: false,
            error: null,
        }
    }

    isValidForm() {
        return this.state.username.length > 0 &&
            this.state.password.length > 0;
    }

    handleSubmit = event => {
        event.preventDefault();
        const { username, password } = this.state;
        userService
            .login(username, password)
            .then(response => {
                this.setState({
                    loggedIn: !!response['token'],
                    username: "",
                    password: "",
                    error: response['error']
                })
            });
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { loggedIn } = this.state;

        if (loggedIn) {
            console.log('redirected to homePage from login page');
            return (
                <Redirect to='/' />
            )
        }

        return (
            <div className="login">
                <p className='error'>{this.state.error}</p>
                <form name="form"
                    onSubmit={this.handleSubmit}>

                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.username}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        onChange={this.handleChange}
                        value={this.state.password}
                    />

                    <button
                        type="submit"
                        disabled={!this.isValidForm()}
                    >Login</button>
                </form>
            </div>
        )
    }


}