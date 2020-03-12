import store from './redux/redux-store.js'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import {HashRouter} from "react-router-dom"
import {Provider} from "react-redux";

ReactDOM.render (
    // <HashRouter basename={process.env.PUBLIC_URL}>
    <HashRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </HashRouter>, document.getElementById('root')
);
