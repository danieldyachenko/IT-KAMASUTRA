import React from 'react';
import {Route, withRouter} from "react-router-dom"
import Navbar from './components/Navbar/Navbar.js';
import DialogsContainer from './components/Dialogs/DialogsContainer.js';
import UsersContainer from './components/Users/UsersContainer.js';
import ProfileContainer from './components/Profile/ProfileContainer.js';
import HeaderContainer from './components/Header/HeaderContainer.js';
import './App.css';
import Login from './components/Login/Login.jsx';
import {connect} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";

class App extends React.Component {
    componentDidMount() {
        this.props.initializeApp();
    }
    render() {
        if (!this.props.initialized) return <Preloader/>;
        return (
            <div className='App'>
                <HeaderContainer/>
                <div className='main'>
                    <Navbar/>
                    <div className='mainRight'>
                        <Route path="/messages" render={() => <DialogsContainer />} />
                        <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                        <Route path="/users" render={() => <UsersContainer />} />
                        <Route path="/login" render={() => <Login />}/>
                    </div>
                </div>
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
