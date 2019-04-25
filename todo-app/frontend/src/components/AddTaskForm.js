import React, {Component} from "react";
import PropTypes from 'prop-types';

import { basketService } from "../services/basket.service";

export default class AddTaskForm extends Component {

    static propTypes = {
         basket_id: PropTypes.number.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            message: "",
            deadline: new Date(),
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

        const { basket_id, message, deadline } = this.state;

        basketService.addTask(basket_id, {
            message: message,
            deadline: deadline
        })
        .then(response => {
            console.log('add task', response);
            this.setState({
                message: "",
                deadline: new Date(),
            })
            this.props.refresh();
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
                    value={this.state.message}
                    onChange={this.handleChange}
                />
                <input
                    type="date"
                    name="deadline"
                    value={this.state.deadline}
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