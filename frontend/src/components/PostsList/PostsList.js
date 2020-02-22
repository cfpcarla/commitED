import React, { useState } from "react";
import PopupPost from "./PopupPost";
import Posts from "./Posts";

export default function PostsList(props) {
  const [show, popupState] = useState(false);
  const [postsModal, setPostsModal] = useState(false);
  let posts = props.posts;
  //do user logic to map filtered for service_provider otherwise map postsLists

  if (props.user) {
    const serviceProviderPosts = posts.filter(post => {
      post.type === props.user.type &&
        props.user.type === "service_provider" &&
        props.user.id === post.user_id;
    });
    const volunteerPosts = posts;
    if (
      props.userStatus &&
      props.user.id &&
      props.user.type === "service_provider"
    ) {
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
