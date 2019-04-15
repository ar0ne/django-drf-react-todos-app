import React, {Component} from "react";


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
    }

    isValidForm() {
        return this.state.username.length > 0 &&
            this.state.password.length > 0;
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log("Do login...", this.state);
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="login">
                <form name="form"
                    onSubmit={this.handleSubmit}>

                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        type="text"
                        onChange={this.handleChange}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        type="password"
                        onChange={this.handleChange}
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