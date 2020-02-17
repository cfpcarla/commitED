import React from "react";
import classnames from "classnames"
// import "components/Posts.scss";

export default function Posts(props) {
  // let postClass = classnames("day-list__item", {
  //   "day-list__item--selected": props.selected,
  //   "day-list__item--full": !props.spots
  // });


  return (
    <li className='postClass' /*onClick={() => props.setDay(props.name)} data-testid="day"*/>

      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--regular">{props.description}</h3>
    </li>
  );
}
