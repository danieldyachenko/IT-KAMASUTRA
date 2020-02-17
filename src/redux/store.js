import {profileReducer} from "./profile-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'post1', likeCount: 12},
                {id: 2, message: 'post2', likeCount: 11},
                {id: 3, message: 'post3', likeCount: 19}
            ],
            newPostText: 'Текст нового поста'
        },
        messagesPage: {
            messages: [
                {id: 1, message: 'message1'},
                {id: 2, message: 'message2'},
                {id: 3, message: 'message3'}
            ],
            dialogData: [
                {id: 1, name: 'dialog1'},
                {id: 2, name: 'dialog2'},
                {id: 3, name: 'dialog3'}
            ],
            newMessageBody: ''
        },
        sidebar: {}
    },
    getState() { return this._state; },
    _callSubscriber() {},
    subscribe (observer) {
        this._callSubscriber = observer;
    },
    dispatch(action){
        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.messagesPage = dialogsReducer(this._state.messagesPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        
        this._callSubscriber(this._state); //rerenderEntireTree
    }
}

export default store;
window.store = store;