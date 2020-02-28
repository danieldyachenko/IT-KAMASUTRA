const SEND_MESSAGE = 'SEND-MESSAGE';

let initialState = {
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
};

export const dialogsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SEND_MESSAGE:
            let body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: body}]
            };
        default: return state;
    } 
};

export const sendMessageCreator = (newMessageBody) => ({type: SEND_MESSAGE, newMessageBody});