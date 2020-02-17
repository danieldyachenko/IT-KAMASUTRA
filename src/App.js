import React from 'react';
import { Route } from "react-router-dom"
import Navbar from './components/Navbar/Navbar.js';
import DialogsContainer from './components/Dialogs/DialogsContainer.js';
import UsersContainer from './components/Users/UsersContainer.js';
import ProfileContainer from './components/Profile/ProfileContainer.js';
import HeaderContainer from './components/Header/HeaderContainer.js';
import './App.css';

const App = (props) => {
    return (
        <div className='App'>
            <HeaderContainer />
            <div className='main'>
                <Navbar />
                <div className='mainRight'>
                    <Route path="/messages" render={() => <DialogsContainer />} />
                    <Route path="/profile/:userId?" render={() => <ProfileContainer />} />
                    <Route path="/users" render={() => <UsersContainer />} />
                </div>
            </div>
        </div>
    )
}

export default App;
