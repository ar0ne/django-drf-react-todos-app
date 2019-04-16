import React from 'react';
import ReactDOM from 'react-dom';
import DataProvider from './DataProvider';

import Navigation from './Navigation';


export default class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div className="content">
                <Navigation />
            </div>
        );
    }
}

const wrapper = document.getElementById('app');

wrapper ? ReactDOM.render(<App />, wrapper) : null;