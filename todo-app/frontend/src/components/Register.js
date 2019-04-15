import React, {Component} from "react";


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            email: "",
            password1: "",
            password2: "",
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
        console.log("Do registration...", this.state);
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
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