import React, {Component} from "react";
import PropTypes from 'prop-types';

import { basketService } from '../services/basket.service';

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            basket_id: null
        }
    }

    componentDidMount() {
        const { basket_id, tasks } = this.props;
        this.setState({
            tasks: tasks,
            basket_id: basket_id
        });
    }

    handleCheckboxChange = event => {
        const { name, value } = event.target;

        let { basket_id, tasks } = this.state;

        let found = tasks.find(t => t.id == name);

        found.completed = !found.completed;

        this.setState({
            tasks
        });

        basketService.updateTasks(basket_id, found)
            .then(response => {
                console.log('updated task', response);
            });
    }

    render() {
        let tasks = this.state.tasks;

        if (!tasks.length) {
            return (
                <p>No tasks in basket</p>
            );
        }
        return (
            <ul className="tasks">
            {tasks.map((task, index) =>
                <li
                    key={index}>
                    <input
                        type="checkbox"
                        checked={task.completed}
                        name={task.id}
                        onChange={this.handleCheckboxChange}
                    />
                    {task.message}
                </li>
            )}
            </ul>
        )
    }
}

export default Tasks;