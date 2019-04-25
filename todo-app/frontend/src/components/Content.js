import React from 'react';
import PropTypes from 'prop-types';

import Baskets from './Baskets';

export default class Content extends React.Component {
    static propTypes = {
         loggedIn: PropTypes.bool.isRequired
    };

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
