import React, { useState } from "react";
import Button from "../CustomButtons/Button"

export default function Post({showPostModal, post}) {

  return (
    <Button
      justify-content='left'
      block
      color="info"
      onClick={showPostModal}
      >
      <div key={post.id} >
        <ul>{post.title}</ul>
        <ul> {post.description} </ul>
      </div>
    </Button>
  );
}
