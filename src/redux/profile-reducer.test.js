import React from 'react';
import {addPostActionCreator, profileReducer} from "./profile-reducer";

it('renders without crashing', function () {
    let action = addPostActionCreator('post name');
    let state = {
        posts: [
            {id: 1, message: 'post1', likeCount: 12},
            {id: 2, message: 'post2', likeCount: 11},
            {id: 3, message: 'post3', likeCount: 19}
        ]
    };
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4);
});