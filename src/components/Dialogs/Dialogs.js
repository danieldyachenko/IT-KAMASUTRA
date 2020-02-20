import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from './DialogItem/DialogItem.js'
import Messages from './Message/Message.js'
import { Redirect } from 'react-router-dom';

// Компонент 'Dialogs'
const Dialogs = (props) => {

  let messagesPage = props.messagesPage;

  let dialogElements = messagesPage.dialogData.map((d) => <DialogItem name = {d.name} key = {d.id} id = {d.id}/>);
  let messagesElement = messagesPage.messages.map((m) => <Messages message = {m.message} key = {m.id} id = {m.id}/>);
  let newMessageBody = messagesPage.newMessageBody;
  
  let onSendMessageClick = () => {
    props.sendMessage();
  }
  let onNewMessageChange = (e) => {
    props.updateNewMessageBody(e.target.value);
  }

  if (!props.isAuth) return <Redirect to={'/login'}/>;
  
  return (
    <div className = {s.Dialogs}>
      {dialogElements}
      <div>{messagesElement}</div>
      <div>
        <div><textarea onChange={onNewMessageChange} value={newMessageBody} placeholder='Enter your message'></textarea></div>
        <div><button onClick={onSendMessageClick}>Send</button></div>
      </div>
    </div>
  );
}

export default Dialogs;
