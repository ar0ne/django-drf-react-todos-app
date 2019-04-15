import React from 'react';
import ReactDOM from 'react-dom';
import DataProvider from './DataProvider';

import Basket from './Basket';
import Login from './Login';
import Register from './Register';


const App = () => (
    <div>
        <DataProvider endpoint="api/basket/"
            render={data => <Basket data={data} />} />
        <Login />
        <Register />
    </div>
);

const wrapper = document.getElementById('app');

wrapper ? ReactDOM.render(<App />, wrapper) : null;