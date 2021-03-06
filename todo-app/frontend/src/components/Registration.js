import React, {Component} from "react";
import { Redirect } from 'react-router';

import { userService } from '../services/user.service';

export default class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password1: "",
            password2: "",
            registered: false
        }
    }

    isValidForm() {
        return this.state.username.length > 0 &&
            this.state.email.length > 0 &&
            this.state.password1.length > 0 &&
            this.state.password2.length > 0 &&
            this.state.password1 === this.state.password2;
    }

    handleSubmit = event => {
        event.preventDefault();
        const {username, password1, email} = this.state;

        userService.register(username, password1, email)
            .then(response => {
                console.log(response);
                this.setState({registered: !!response['username']})
            });

    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        const { registered } = this.state;

        if (registered) {
            console.log('redirected');
            return (
                <Redirect to='/' />
            )
        }

        return (
            <div className="register">
                <form name="form"
                    onSubmit={this.handleSubmit}>

                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        type="text"
                        onChange={this.handleChange}
                    />

                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        type="email"
                        onChange={this.handleChange}
                    />

                    <label htmlFor="password1">Password</label>
                    <input
                        name="password1"
                        type="password"
                        onChange={this.handleChange}
                    />

                    <label htmlFor="password2">Repeat password</label>
                    <input
                        name="password2"
                        type="password"
                        onChange={this.handleChange}
                    />

                    <button
                        type="submit"
                        disabled={!this.isValidForm()}
                    >Register</button>
                </form>
            </div>
        )
    }


}