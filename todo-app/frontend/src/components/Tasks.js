import React, {Component} from "react";
import PropTypes from 'prop-types';

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    componentDidMount() {
        const { tasks } = this.props;
        this.setState({
            tasks: tasks
        });
    }

    handleCheckboxChange = event => {
        const { name, value } = event.target;

        let { tasks } = this.state;

        let found = tasks.find(t => t.id == name);

        found.completed = !found.completed;

        this.setState({
            tasks
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