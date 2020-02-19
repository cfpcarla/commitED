import React, { useState } from "react";
import Posts from "./Posts";

export default function WaitingPostsList(props) {
  let posts = props.posts;
  const postlist = posts.map(post => {
    return (
      <Posts
        key={post.id}
        title={post.title}
        description={post.description}
        date={post.date_posted}
      />
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
