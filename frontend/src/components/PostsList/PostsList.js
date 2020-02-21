import React, { useState } from "react";
import PopupPost from './PopupPost'
import Posts from "./Posts";

export default function PostsList(props) {
  const [show, popupState] = useState(false)
  const [postsModal, setPostsModal] = useState(false);
  let posts = props.posts;
  const postlist = posts.map(post => {
    return (
      <ul>
      <Posts
        key={post.id}
        title={post.title}
        description={post.description}
        date={post.date_posted}
        setPostsModal={() => setPostsModal(v => !v)}
      />
      <PopupPost
         key={post.id}
         title={post.title}
         description={post.description}
         date={post.date_posted}
        postsModal={postsModal}
        setPostsModal={setPostsModal}
        show={show}/>
      </ul>
    );
  });

  return <ul>{postlist}</ul>;
}
