import React, { useState } from "react";
import PopupOrgPosts from './'
import Posts from "./Posts";

export default function OrgPostsList(props) {
  const [show, popupState] = useState(false)
  const [orgPostsModal, setOrgPostsModal] = useState(false);
  let posts = props.posts;
  const postlist = posts.map(post => { //check organization ID prop to pass on
    return (
      <ul>
      <Posts
        key={post.id}
        title={post.title}
        description={post.description}
        date={post.date_posted}
        //buttons logic goes in here?
      />
      <PopupPost
      key={post.id}
      title={post.title}
      description={post.description}
      date={post.date_posted}
      orgPostsModal={orgPostsModal}
      setOrgPostsModal={setOrgPostsModal}
      show={show}/>
      </ul>
    );
  });

  return <ul>{postlist}</ul>;
}
// Posts-list displays the posts
// Issues to solve:
// - apply/cancel button logic
// - available/waiting banner logic
//
//
