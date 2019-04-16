import React from 'react';

import DataProvider from "./DataProvider";

export default class Index extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        }
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
            <DataProvider
                endpoint="api/basket/"
                render={
                    data => <Basket baskets={data} />
                }
            />
        )

    }
}

