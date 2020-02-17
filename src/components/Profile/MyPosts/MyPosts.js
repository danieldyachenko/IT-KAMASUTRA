import React from 'react';
import Post from './Post/Post.js'

const MyPosts = (props) => {
  let postsElements = props.posts.map(p => <Post message = {p.message} likeCount = {p.likeCount}/>);
  
  let newPostElement = React.createRef();

  let onAddPost = () => {
    props.addPost();
  }

  let onPostChange = () => {
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  }
  
  return (
    <div>
      <div>MyPosts</div>
      <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
      <div>
        <button onClick={onAddPost}>Add post</button>
      </div>
      {postsElements}
    </div>
  );
}

export default MyPosts;
