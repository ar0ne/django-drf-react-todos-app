import React from 'react';
import ReactDOM from 'react-dom';
import DataProvider from './DataProvider';

import Basket from './Basket';
import Login from './Login';
import Register from './Register';


const App = () => (
    <div className="content">
        <DataProvider endpoint="api/basket/"
            render={data => <Basket baskets={data} />} />
    </div>
);

const wrapper = document.getElementById('app');

wrapper ? ReactDOM.render(<App />, wrapper) : null;