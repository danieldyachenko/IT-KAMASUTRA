import React from 'react';
import {NavLink} from "react-router-dom"

// Компонент "DialogItem"
const DialogItem = (props) => {
  return (
    <div>
      <NavLink to = {'/messages/' + props.id}><div>{props.name}</div></NavLink>
    </div>
  );
}

export default DialogItem;
