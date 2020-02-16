import React from 'react';
import Header from "../Header/Header";
import { Button } from '@material-ui/core';
import PopupLogin from '../PopupLogin/PopupLogin'

export default function NavBar() {
  // state = {
  //   open: false
  // }
  // let pop = <PopupLogin/>;

  //  handleClick = () =>{
  //   this.setState({open: true, pop })
  //   }

  const rightLinks = [
    <Button brand="white">Login/Register</Button>
// onClick={() => this.handleClick()}
  ];

  return (
    <div>
      <Header brand='CommittED' color="primary" rightLinks={rightLinks} />
    </div>
  );
}
