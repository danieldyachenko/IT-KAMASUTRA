import React from 'react';
import Post from './Post/Post.js'
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import {Textarea} from "../../common/FormsControls/FormsControls";

const maxLength = maxLengthCreator(10); //Валидатор для проверки кол-ва введенных символов

let AddNewPostForm = props => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field name={'newPostText'} component={Textarea} validate={[required, maxLength]} />
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
};

let AddNewPostFormRedux = reduxForm({form: 'ProfileAddNewPostForm'})(AddNewPostForm);

const MyPosts = (props) => {
    let postsElements = props.posts.map(p => <Post message={p.message} likeCount={p.likeCount}/>);

    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    };

    return (
        <>
            <h3>MyPosts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost} />
            {postsElements}
        </>
    );
};

export default MyPosts;
