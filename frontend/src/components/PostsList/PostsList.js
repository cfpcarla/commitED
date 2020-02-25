import React, { useState } from "react";
import PopupPost from "./PopupPost";
import Post from "./Post";

export default function PostsList({
  getPosts,
  posts,
  user,
}) {
  const [postToShow, setPostToShow] = useState();

  if (user) {
    const serviceProviderPosts = posts.filter(post => {
      return (
        user.type === "service_provider" && post.user_id === user.id
      );
    });

    const volunteerPosts = posts;
    if (user && user.type === "service_provider") {
      posts = serviceProviderPosts;
    } else {
      posts = volunteerPosts;
    }
  }

  return (
    <React.Fragment>
      <div>
      <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
        {posts.map(post => (
          <li key={post.id}>
            <Post
              post={post}
              showPostModal={() => setPostToShow(post)}
            />
          </li>
        ))}
      </ul>
      {postToShow && (
        <PopupPost
          user={user}
          post={postToShow}
          onClose={() => setPostToShow(null)}
          getPosts={getPosts}
        />
      )}
      </div>
    </React.Fragment>
  )
}
