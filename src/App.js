import React from 'react';
import {Redirect, Route, withRouter} from "react-router-dom"
import Navbar from './components/Navbar/Navbar.js';
import UsersContainer from './components/Users/UsersContainer.js';
import ProfileContainer from './components/Profile/ProfileContainer.js';
import HeaderContainer from './components/Header/HeaderContainer.js';
import './App.css';
import Login from './components/Login/Login.jsx';
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {withSuspense} from "./hoc/withSuspense";

// import DialogsContainer from './components/Dialogs/DialogsContainer.js';
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer.js'));

class App extends React.Component {
    /*catchAllUnhandledErrors = promiseRejectionEvent => {
        alert('Some error occured');

    };*/
    componentDidMount() {
        this.props.initializeApp();
        // window.addEventListener('unHandledRejection', this.catchAllUnhandledErrors)
    }
    /*componentWillUnmount() {
        window.removeEventListener('unHandledRejection', this.catchAllUnhandledErrors)
    }*/

    render() {
        if (!this.props.initialized) return <Preloader/>;
        return (
            <div className='App'>
                <HeaderContainer/>
                <main>
                    <Navbar/>
                    <article>
                        {/*<Route path="/" render={() => <Redirect to={'/profile'}/>} />*/}
                        <Route path="/messages" render={withSuspense(DialogsContainer)} />
                        <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                        <Route path="/users" render={() => <UsersContainer />} />
                        <Route exact path="/login" render={() => <Login />}/> {/*Строгий маршрут*/}
                    </article>
                </main>
            </div>
        )
    }
}

export default compose(
    withRouter,
    connect(state => ({
        initialized: state.app.initialized
    }), {initializeApp})
) (App);
