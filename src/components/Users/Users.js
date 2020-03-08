import React from 'react';
import s from './Users.module.css';
import {Paginator} from "../common/Paginator/Paginator";
import {User} from "./User";

export const Users = ({totalUsersCount, pageSize, currentPage, onPageChanged, ...props}) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    return (
        <div className = {s.Users}>
            <Paginator
                onPageChanged={onPageChanged}
                currentPage={currentPage}
                totalUsersCount={totalUsersCount}
                pageSize={pageSize}
            />
            {
                props.users.map(u =>
                    <User
                        key={u.key}
                        user={u}
                        followingInProgress={props.followingInProgress}
                        unfollow={props.unfollow}
                        follow={props.follow}
                    />
                )
            };
        </div>
    )
};

