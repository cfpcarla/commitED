import React, {setState} from 'react';
import Header from "../Header/Header";
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
    <div key={0}>
    <Button
    color="danger"
    block
    onClick={() => handleLogout()}
    >Logout</Button>
    </div>,

    <div key={1} >


    <Button
    color="success"
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
       <Header  color="primary" rightLinks={linkToUse} />
      </div>
    </div>
  );
}
