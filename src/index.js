import store from './redux/redux-store.js'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux";

ReactDOM.render (
    // <HashRouter basename={process.env.PUBLIC_URL}>
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>, document.getElementById('root')
);
