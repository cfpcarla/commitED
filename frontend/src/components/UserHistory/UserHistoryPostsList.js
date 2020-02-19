import React, { useState } from "react";
import Posts from "./Posts";

export default function HistoryPostsList(props) {
  let posts = props.posts;
  const postlist = posts.map(post => {  //order by date
    return (
      <Posts
        key={post.id}
        title={post.title}
        description={post.description}
        date={post.date_posted}
        //buttons logic goes in here?
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
