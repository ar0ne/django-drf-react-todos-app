import React, {Component} from "react";
import PropTypes from 'prop-types';

import { basketService } from "../services/basket.service";

export default class AddTaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            deadline: null,
            basket_id: null
        }
    }

    componentDidMount() {
        const { basket_id } = this.props;
        if (basket_id) {
            this.setState({
                basket_id: basket_id
            });
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit = event => {
        event.preventDefault();
        console.log('add task...', this.state);

        const { basket_id, message, deadline } = this.state;

        basketService.addTask(basket_id, {
            message: message,
            deadline: deadline
        })
        .then(response => {
            console.log('add task', response);
        });
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
                <input
                    type="date"
                    name="deadline"
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