import React from 'react';
import ReactDOM from 'react-dom';

import Navigation from './Navigation';

export default class App extends React.Component {

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