import React from 'react';

import { basketService } from '../services/basket.service';
import { userService } from '../services/user.service';

import Basket from './Basket';

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            baskets: []
        }
    }

    componentDidMount() {
        userService.authUserToken.subscribe(token => {
            if (token) {
                basketService.getAll().then(baskets => {
                    this.setState({
                        loggedIn: true,
                        baskets: baskets
                    });
                });
            }
        });
    }


    render () {
        let { loggedIn } = this.state;

        if (!loggedIn) {
            return (
                <div className="content">
                    <p>This application helps you to keep and track all your TODOs</p>
                    <b>Please sign in!</b>
                </div>
            )
        }

        return (
            <Basket baskets={this.state.baskets} />
        )

    }
}

