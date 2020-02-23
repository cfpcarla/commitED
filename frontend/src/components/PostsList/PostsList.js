import React, { useState } from "react";
import PopupPost from "./PopupPost";
import Posts from "./Posts";

export default function PostsList(props) {
  const [show, popupState] = useState(false);
  const [postsModal, setPostsModal] = useState(false);
  let posts = props.posts;

  if (props.user) {
    const serviceProviderPosts = posts.filter(post => {
      return (
        props.user.type === "service_provider" && post.user_id === props.user.id
      );
    });

    const volunteerPosts = posts;
    if (props.user && props.user.type === "service_provider") {
      posts = serviceProviderPosts;
    } else {
      posts = volunteerPosts;
    }
  }

  const postList = posts.map((post, index) => {
    return (
      <ul key={post.id}>
        <Posts
          title={post.title}
          description={post.description}
          date={post.date_posted}
          setPostsModal={() => setPostsModal(v => !v)}
        />
        <PopupPost
          user={props.user}
          title={post.title}
          description={post.description}
          date={post.date_posted}
          postsModal={postsModal}
          setPostsModal={setPostsModal}
          /*show={show}*/ show={postsModal}
        />
      </ul>
    );
  });
  // console.log("_--______--->", props);
  // console.log("======>>", postList);

  return <ul>{postList}</ul>;
}
