import React, { useState } from "react";
import Button from "../CustomButtons/Button"

export default function Post({showPostModal, post}) {

  return (
    <Button
      style={{borderRadius: "50px" }}
      height='40px'
      justify-content='left'
      block
      color="info"
      onClick={showPostModal}
      >
      <div key={post.id} >
        <ul style={{listStyleType: 'none', padding: 0, margin: 0}}>
        <li style={{fontSize: 19}}>{post.title}</li>
        </ul>
      </div>
    </Button>
  );
}
