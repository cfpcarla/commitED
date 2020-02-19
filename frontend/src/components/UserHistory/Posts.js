import React, { useState } from "react";
import Button from "../../components/CustomButtons/Button"

export default function Posts(props) {
  return (
    <Button
    color="info"
    block >
    <div>
      <ul>{props.title}</ul>
      <ul> {props.description} </ul>
      <ul> {props.date}</ul>
    </div>
    </Button>
  );
}
