const SEND_MESSAGE = 'SEND-MESSAGE';

type MessageType = {
    id: number
    message: string
}

type DialogType = {
    id: number
    name: string
}

const initialState = {
    messages: [
        {id: 1, message: 'message1'},
        {id: 2, message: 'message2'},
        {id: 3, message: 'message3'}
    ] as Array<MessageType>,
    dialogData: [
        {id: 1, name: 'dialog1'},
        {id: 2, name: 'dialog2'},
        {id: 3, name: 'dialog3'}
    ] as Array<DialogType>,
};

export type InitialStateType = typeof initialState

export const dialogsReducer = (state = initialState, action: any): InitialStateType => {
    switch(action.type) {
        case SEND_MESSAGE:
            const body = action.newMessageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 4, message: body}]
            };
        default: return state;
    } 
};

type SendMessageCreatorActionType = {
    type: typeof SEND_MESSAGE
    newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType =>
    ({type: SEND_MESSAGE, newMessageBody});