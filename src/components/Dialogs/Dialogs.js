import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem.js'
import Messages from './Message/Message.js'
import {Field, reduxForm} from "redux-form";

const Dialogs = (props) => {

    let messagesPage = props.messagesPage;

    let dialogElements = messagesPage.dialogData.map((d) => <DialogItem name={d.name} key={d.id} id={d.id}/>);
    let messagesElement = messagesPage.messages.map((m) => <Messages message={m.message} key={m.id} id={m.id}/>);

    let addNewMessage = values => {
        props.sendMessage(values.newMessageBody);
    };

    return (
        <div className={s.Dialogs}>
            {dialogElements}
            <div>{messagesElement}</div>
            <AddMessageFormRedux onSubmit={addNewMessage}/>
        </div>
    );
};

const AddMessageForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div><Field component='textarea' name='newMessageBody' placeholder='Enter your message'/></div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
};

const AddMessageFormRedux = reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);

export default Dialogs;
