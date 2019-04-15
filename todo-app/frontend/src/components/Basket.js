import React, {Component} from "react";
import PropTypes from 'prop-types';

import Tasks from './Tasks';


class Basket extends Component {
    static propTypes = {
         data: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }

    render () {
        let data = this.props.data;
        if (!data.length) {
            return (<p>Nothing to show</p>)
        }
        return (
            <div className="basket">
                <h2 className="title">Baskets</h2>
                <div>
                    {data.map((basket, index) =>
                        <div key={index}>
                            <p>{basket.id} - {basket.title}</p>
                            <Tasks data={basket.tasks} />
                        </div>
                    )}
                </div>
            </div>
        )
    }
};


export default Basket;