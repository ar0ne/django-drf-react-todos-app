import React from 'react';
import ReactDOM from 'react-dom';
import DataProvider from './DataProvider';

import Basket from './Basket';


const App = () => (
    <DataProvider endpoint="api/basket/"
        render={data => <Basket data={data} />} />
);

const wrapper = document.getElementById('app');

wrapper ? ReactDOM.render(<App />, wrapper) : null;