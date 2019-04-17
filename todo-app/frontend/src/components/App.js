import React from 'react';
import ReactDOM from 'react-dom';

import { userService } from '../services/user.service';

import Navigation from './Navigation';
import Content from './Content';

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