// Posts-list displays the posts
// Issues to solve:
// - button logic
//
//
//


import React from "react";
import Posts from "/Posts";

export default function DayList(props) {
  const postlist = props.posts.map(post => {
    return (
      <Posts
        key={post.id}
        name={post.name}
        description={post.description}
        //buttons logic goes in here
         />
    );
  });

  return (
    <ul>
      {postlist}
    </ul>
  )
}
