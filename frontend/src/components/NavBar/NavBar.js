import React, {setState} from 'react';
import Header from "../Header/Header";
import PopupLogin from '../PopupLogin/PopupLogin'
import Button from "../CustomButtons/Button";



export default function NavBar(props) {
  //defines the State of the button

  const rightLinks = [

    <Button
    color="primary"
    block
    onClick={() => props.setClassicModal(true)}
    >Login/Register</Button>

  ];

  return (
    <div>
      <div>
        <Header brand='CommittED' color="primary" rightLinks={rightLinks} />
      </div>
    </div>
  );
}
