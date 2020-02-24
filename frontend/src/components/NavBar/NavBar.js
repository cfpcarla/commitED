import React, {setState} from 'react';
import Header from "../Header/Header";
import PopupLogin from '../PopupLogin/PopupLogin'
import Button from "../CustomButtons/Button";



export default function NavBar(props) {
  //defines the State of the button
  //  props.setUserStatus(false) onclick logout

  function handleLogout() {
    props.setUser(null);
    localStorage.removeItem('user');
    window.location = '/';
  }

  const rightLinks = [
  <Button
    color="danger"
    block
    onClick={() => handleLogout()}

    >Logout</Button>,

    <div key={1} >
    <Button
    color="primary"
    block
    onClick={() => props.setClassicModal(true)}
    >Login/Register</Button>
    </div>

  ];

 let linkToUse;
 props.user? ( linkToUse = rightLinks[0]): ( linkToUse = rightLinks[1])
  return (
    <div>
      <div>
       <Header brand='CommittED' color="primary" rightLinks={linkToUse} />
      </div>
    </div>
  );
}
