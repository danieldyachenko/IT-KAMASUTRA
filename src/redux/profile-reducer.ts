import {profileAPI, usersAPI} from '../api/api';
import {stopSubmit} from "redux-form";
import {PhotosType, PostType, ProfileType} from "../type/types";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const DELETE_POST = 'DELETE_POST';

const initialState = {
    posts: [
        {id: 1, message: 'post1', likeCount: 12},
        {id: 2, message: 'post2', likeCount: 11},
        {id: 3, message: 'post3', likeCount: 19}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    newPostText: ''
};

export type InitialStateType = typeof initialState

export const profileReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                message: action.newPostText,
                likeCount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        }
        case SET_USER_PROFILE: {
            return {...state, profile: action.profile};
        }
        case SET_STATUS: {
            return {...state, status: action.status};
        }
        case SAVE_PHOTO_SUCCESS: {
            return {...state, profile: {...state.profile, photos: action.photos} as ProfileType};
        }
        default:
            return state;
    }
};

type AddPostActionCreatorType = { type: typeof ADD_POST, newPostText: string }
export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({ type: ADD_POST, newPostText });

type SetUserProfileType = {type: typeof SET_USER_PROFILE, profile: ProfileType}
export const setUserProfile = (profile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, profile});

type SetStatusType = {type: typeof SET_STATUS, status: string}
export const setStatus = (status: string): SetStatusType => ({type: SET_STATUS, status});

type SetPhotoSuccessType = {type: typeof SAVE_PHOTO_SUCCESS, photos: PhotosType}
export const setPhotoSuccess = (photos: PhotosType): SetPhotoSuccessType => ({type: SAVE_PHOTO_SUCCESS, photos});

type DeletePostType = {type: typeof DELETE_POST, postId: number}
export const deletePost = (postId: number): DeletePostType => ({type: DELETE_POST, postId});

//thunkMiddleware
export const getUserProfile = (userId: number) => async (dispatch: any) => {
    let response = await usersAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
};

export const getStatus = (userId: number) => async (dispatch: any) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
};

export const updateStatus = (status: string) => async (dispatch: any) => {
    try {
        let response = await profileAPI.updateStatus(status);
        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch (e) {
        alert('...');
    }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
    let response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
        dispatch(setPhotoSuccess(response.data.data.photos));
    }
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
        dispatch(getUserProfile(userId));
    } else {
        dispatch(stopSubmit('edit-profile', {_error: response.data.messages[0]}));
        return Promise.reject(response.data.messages[0]);
    }
};
