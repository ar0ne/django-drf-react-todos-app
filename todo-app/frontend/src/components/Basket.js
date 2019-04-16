import React, {Component} from "react";
import PropTypes from 'prop-types';

import Tasks from './Tasks';
import AddTaskForm from './AddTaskForm';


class Basket extends Component {
//    static propTypes = {
//         baskets: PropTypes.array.isRequired
//    };

    constructor(props) {
        super(props);
        this.state = {
            baskets: []
        }
    }

    componentDidMount() {
        const { baskets } = this.props;
        if (baskets) {
            this.setState({
                baskets: baskets
            });
        }
    }

    render () {
        let baskets = this.state.baskets;
        if (!baskets.length) {
            return (<p>Nothing to show</p>)
        }
        return (
            <div className="basket">
                <h2 className="title">Baskets</h2>
                <div>
                    {baskets.map((basket, index) =>
                        <div key={index}>
                            <p>{basket.id} - {basket.title}</p>
                            <Tasks tasks={basket.tasks} basket_id={basket.id}/>
                            <AddTaskForm basket_id={basket.id} />
                        </div>
                    )}
                </div>
            </div>
        )
    }
};


export default Basket;