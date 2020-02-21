import React, { useState } from "react";
import Button from "../../components/CustomButtons/Button"

export default function Posts(props) {

  return (
    <Button justify-content='left'
    color="info"
    block
    onClick={() => props.setPostsModal(true)}
    >
    <div key={props.id} >
      <ul>{props.title}</ul>
      <ul> {props.description} </ul>
    </div>
    </Button>
  );
}
