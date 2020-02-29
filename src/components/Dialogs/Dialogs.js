import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem.js'
import Messages from './Message/Message.js'
import AddMessageForm from "./AddMessageForm/AddMessageForm";

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
            <AddMessageForm onSubmit={addNewMessage}/>
        </div>
    );
};

export default Dialogs;
