import React, { useState } from "react";
//import classnames from "classnames"
// import "components/Posts.scss";

export default function Posts(props) {
  return (
    <div>
      <ul>{props.title}</ul>
      <ul> {props.description} </ul>
      <ul> {props.date}</ul>
    </div>
  );
}
