import React from 'react';
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs';

import { basketService } from '../services/basket.service';
import { userService } from '../services/user.service';

import Basket from './Basket';
import Navigation from './Navigation';

export default class Content extends React.Component {

    unsubscribe$ = new Subject();

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            baskets: []
        }
    }

    componentDidMount() {
        userService.authUserToken
        .pipe(
            takeUntil(this.unsubscribe$)
        )
        .subscribe(token => {
            basketService.getAll().then(baskets => {
                this.setState({
                    loggedIn: !!token,
                    baskets: baskets
                });
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    render () {
        let { loggedIn, baskets } = this.state;

        const content = loggedIn ?
        (
            <Basket baskets={baskets} />
        ) : (
            <h1>Sign in first</h1>
        )

        return (
            <div>
                { content }
            </div>
        )

    }
}
