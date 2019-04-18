import React from 'react';
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs';

import { userService } from '../services/user.service';

import Baskets from './Baskets';
import Navigation from './Navigation';

export default class Content extends React.Component {

    render () {
        const { loggedIn } = this.props;

        const content = loggedIn ?
        (
            <div>
                <Baskets loggedIn={this.props.loggedIn} />
            </div>
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
