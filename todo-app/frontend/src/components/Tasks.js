import React, {Component} from "react";
import PropTypes from 'prop-types';

class Tasks extends Component {

   constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }


    render() {
        let data = this.props.data;
        if (!data.length) {
            return (
                <p>No tasks in basket</p>
            );
        }
        return (
            <ul className="tasks">
            {data.map((task, index) =>
                <li
                    key={index}>
                    {task.message}
                </li>
            )}
            </ul>
        )
    }
}

export default Tasks;