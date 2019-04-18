import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs';

import Content from './Content';
import Login from './Login';
import Logout from './Logout';
import Registration from './Registration';

import { userService } from '../services/user.service';

export default class Navigation extends Component {

    unsubscribe$ = new Subject();

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
    }

    componentDidMount() {
        userService.authUserToken
        .pipe(
            takeUntil(this.unsubscribe$)
        )
        .subscribe(token => {
            this.setState({
                loggedIn: !!token
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }


    render() {
        const dynamicLinks = this.state.loggedIn ?
        (
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/logout">Logout</Link>
                </li>
            </ul>
        ) :
        (
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/registration">Registration</Link>
                </li>
            </ul>
        )

        return (
             <BrowserRouter>
                <div>
                    <nav>
                        { dynamicLinks }
                    </nav>
                    <Route exact path="/"
                        render={(props) => <Content {...props} loggedIn={this.state.loggedIn}/>}
                    />
                    <Route path="/login" component={Login} />
                    <Route path="/logout" component={Logout} />
                    <Route path="/registration" component={Registration} />
                </div>
             </BrowserRouter>
        );
    }
}