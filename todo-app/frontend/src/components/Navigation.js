import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Index from './Index';
import Login from './Login';
import Register from './Register';


export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/login">Login</Link>
                            </li>
                            <li>
                                <Link to="/registration">Sign in</Link>
                            </li>
                        </ul>
                    </nav>

                    <Route exact path="/" component={Index} />
                    <Route path="/login" component={Login} />
                    <Route path="/registration" component={Register} />
                </div>
            </BrowserRouter>
        )
    }
//


}