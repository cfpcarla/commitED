import React, { useState } from "react";
import Button from "../CustomButtons/Button"

export default function Post({showPostModal, post}) {

  return (
    <Button
      style={{borderRadius: "50px"}}
      justify-content='left'
      block
      color="info"
      onClick={showPostModal}
      >
      <div key={post.id} >
        <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
        <li>{post.title}</li>
        <li>{post.description}</li>
        </ul>
      </div>
    </Button>
  );
}
