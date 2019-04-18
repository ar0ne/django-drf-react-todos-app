import React, {Component} from "react";
import PropTypes from 'prop-types';

import Tasks from './Tasks';
import AddTaskForm from './AddTaskForm';

import { basketService } from '../services/basket.service';


class Baskets extends Component {
//    static propTypes = {
//         baskets: PropTypes.array.isRequired
//    };

    constructor(props) {
        super(props);
        this.state = {
            baskets: [],
            addNewBasketEnabled: false,
            newBasketName: ""
        }
    }

    componentDidMount() {
        const { loggedIn } = this.props;
        if (loggedIn) {
            basketService.getAll().then(baskets => {
                this.setState({
                    baskets: baskets
                });
            });
        }
    }

    handleCreateNewBasket = event => {

        const {newBasketName} = this.state;

        basketService.addBasket(newBasketName).then(response => {
            console.log(response);
        });

    }


    handleChangeNewBasketName = event => {
        const { name, value } = event.target;
        console.log(value);
        this.setState({
            [name]: value
        })

    }

    handleToggleCreateNewBasket = event => {
        const { addNewBasketEnabled } = this.state;
        this.setState({
            addNewBasketEnabled: !addNewBasketEnabled
        });
    }

    handleRemoveBasket = event => {
        const { name } = event.target;

        basketService.removeBasket(name)
            .then(response => {
                console.log(response);
            });

    }


    render () {
        const { baskets } = this.state;

        const content = !baskets.length ? (
            <p>Nothing to show</p>
        ) : (
            <div>
                <h2 className="title">Baskets</h2>
                {baskets.map((basket, index) =>
                    <div key={index}>
                        <p>{basket.id} - {basket.title}</p>
                        <button
                            name={basket.id}
                            onClick={this.handleRemoveBasket}
                        >Remove</button>
                        <Tasks tasks={basket.tasks} basket_id={basket.id}/>
                        <AddTaskForm basket_id={basket.id} />
                    </div>
                )}
            </div>
        );

        return (
            <div className="basket">
                <button
                    onClick={this.handleToggleCreateNewBasket}
                >Add new basket</button>

                <div hidden={!this.state.addNewBasketEnabled}>
                    <input
                        type="text"
                        name="newBasketName"
                        onChange={this.handleChangeNewBasketName}
                    />
                    <button
                        onClick={this.handleCreateNewBasket}
                    >Add</button>
                </div>

                { content }
            </div>
        )
    }
};


export default Baskets;