import React, {Component} from "react";
import PropTypes from 'prop-types';


export default class AddTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log('add task...', this.state);
    }

    isValidForm () {
        return this.state.message.length > 0;
    }

    render() {
        return (
           <form name="form"
                onSubmit={this.handleSubmit}>

                <label htmlFor="message">Add new task:</label>
                <input
                    type="text"
                    name="message"
                    onChange={this.handleChange}
                />
                <button
                    type="submit"
                    disabled={!this.isValidForm()}
                >Add</button>
            </form>
        );
    }
}