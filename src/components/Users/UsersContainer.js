import React from 'react';
import { connect } from 'react-redux';
import { follow, unfollow, getUsers } from '../../redux/users-reducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChanged = (pageNumber) => {
        this.props.getUsers(pageNumber, this.props.pageSize);
    }
    render() {
        return (
            <>
                { this.props.isFetching ? <Preloader /> : null }
                <Users 
                    totalUsersCount = {this.props.totalUsersCount}
                    pageSize = {this.props.pageSize}
                    currentPage = {this.props.currentPage} 
                    onPageChanged = {this.onPageChanged}
                    users = {this.props.users}
                    unfollow = {this.props.unfollow}
                    follow = {this.props.follow}
                    followingInProgress = {this.props.followingInProgress}
                />
            </>
        )
    }
}

export default compose(
    connect(state => ({
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching :state.usersPage.isFetching,
        followingInProgress: state.usersPage.followingInProgress
    }), { follow, unfollow, getUsers })
)(UsersContainer);