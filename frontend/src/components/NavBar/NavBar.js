import React from 'react';
import Header from "../Header/Header";
import { Button } from '@material-ui/core';
import PopupLogin from '../PopupLogin/PopupLogin'

export default function NavBar() {
  let state = {
    open: false
  }
  let pop = <PopupLogin/>;

   let handleClick = () =>{
    this.state({open: true, pop })
    }

  const rightLinks = [
    <Button brand="white"  onClick={() => this.handleClick()}
    >Login/Register</Button>
  ];

  return (
    <div>
      <Header brand='CommittED' color="primary" rightLinks={rightLinks} />
    </div>
  );
}
