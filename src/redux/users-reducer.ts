import {usersAPI} from '../api/api';
import {updateObjectInArray} from "../api/object-helpers";
import {UserType} from "../type/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
    users: [] as Array<UserType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: null,
    followingInProgress: [] as Array<number>
};

type InitialStateType = typeof initialState

export const usersReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            };
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            };
        case SET_USERS: {
            return {...state, users: action.users}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.count}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(id => id !== action.userId)
            }
        }

        default:
            return state;
    }
};

type FollowSuccessType = {type: typeof FOLLOW, userId: number}
export const followSuccess = (userId: number): FollowSuccessType => ({type: FOLLOW, userId});

type UnfollowSuccessType = {type: typeof UNFOLLOW, userId: number}
export const unfollowSuccess = (userId: number): UnfollowSuccessType => ({type: UNFOLLOW, userId});

type SetUsersType = {type: typeof SET_USERS, users: Array<UserType>}
export const setUsers = (users: Array<UserType>): SetUsersType => ({type: SET_USERS, users});

type SetCurrentPageType = {type: typeof SET_CURRENT_PAGE, currentPage: number}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage});

type SetTotalUsersCountType = {type: typeof SET_TOTAL_USERS_COUNT, count: number}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType =>
    ({type: SET_TOTAL_USERS_COUNT, count: totalUsersCount});

type ToggleIsFetchingType = {type: typeof TOGGLE_IS_FETCHING, isFetching: boolean}
export const toggleIsFetching = (isFetching: boolean): ToggleIsFetchingType => ({type: TOGGLE_IS_FETCHING, isFetching});

type ToggleFollowingProgressType = {type: typeof TOGGLE_IS_FOLLOWING_PROGRESS, isFetching: boolean, userId: number}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId});

export const requestUsers = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setCurrentPage(currentPage));
    dispatch(toggleIsFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
};

const followUnfollowFlow = async (dispatch: any, userId: number, apiMethod: any, actionCreator: any) => {
    dispatch(toggleFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
};

export const follow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(usersAPI), followSuccess);
};

export const unfollow = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow.bind(usersAPI), unfollowSuccess);
};