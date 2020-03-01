import React from 'react';
import s from './Header.module.css';
import {NavLink} from 'react-router-dom';

export const Header = (props) => {
    return (
        <header className={s.header}>
            <div className={s.loginBlock}>
                {
                    props.isAuth
                        ? <div>{props.login} - <button onClick={props.logout}>Logout</button></div>
                        : <NavLink to={'/login'}>Login</NavLink>
                }
            </div>
        </header>
    );
};
