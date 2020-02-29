import React from 'react';
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength = maxLengthCreator(50);

const AddMessageForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field component={Textarea} name='newMessageBody' placeholder='Enter your message' validate={[required, maxLength]}/>
            </div>
            <div>
                <button>Send</button>
            </div>
        </form>
    )
};

export default reduxForm({form: 'dialogAddMessageForm'})(AddMessageForm);