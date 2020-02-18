import React from "react";
import Posts from "./Posts";

export default function PostsList(props) {
  const postlist = props.posts.map(post => {
    return (
      <Posts
        key={post.id}
        name={post.name}
        description={post.description}
        //buttons logic goes in here?
         />
    );
  });

  return (
    <ul>
      {postlist}
    </ul>
  )
}
// Posts-list displays the posts
// Issues to solve:
// - apply/cancel button logic
// - available/waiting banner logic
//
//
