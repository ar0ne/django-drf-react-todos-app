import React, {Component} from "react";
import PropTypes from 'prop-types';

import { basketService } from '../services/basket.service';

class Tasks extends Component {
    static propTypes = {
        basket_id: PropTypes.number.isRequired,
        tasks: PropTypes.array.isRequired,
    };

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
        const { name } = event.target;

        let { basket_id, tasks } = this.state;

        let found = tasks.find(t => t.id == name);

        found.completed = !found.completed;

        basketService.updateTasks(basket_id, found)
            .then(response => {
                this.props.refresh();
            });
    }

    handleDelete = event => {
        const { name } = event.target;

        let { basket_id, tasks } = this.state;

        basketService.removeTask(basket_id, name)
            .then(response => {
                this.props.refresh();
            });
    }

    render() {
        const { tasks } = this.state;

        if (!tasks.length) {
            return (
                <p>No tasks in basket</p>
            );
        }
        return (
            <ul className="tasks">
                {tasks.map((task, index) =>
                    <li
                        key={task.id}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            name={task.id}
                            onChange={this.handleCheckboxChange}
                        />
                        {task.message}

                        <button
                            onClick={this.handleDelete}
                            name={task.id}
                        >Delete</button>
                    </li>
                )}
            </ul>
        )
    }
}

export default Tasks;