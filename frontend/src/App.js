import React, { useState, useEffect } from "react";
import './App.scss';
import { Container, Box, Grid, Paper } from '@material-ui/core'
import { sizing } from '@material-ui/core'
import NavBar from './components/NavBar/NavBar.js'
import PostsList from "./components/PostsList/PostsList";
import Map from './components/Map/Map'
import PopupLogin from "./components/PopupLogin/PopupLogin"
import PopupHistory from "./components/PopupHistory/PopupHistory"
import RegisterForm from "./components/RegisterForm/RegisterForm"
import axios from "axios";



export default function App() {
  //on placeholder 1 insert <PostsList/>
  //on placeholder 2 insert <Map/>
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/posts`).then(res => {
      setPosts(res.data);
    });
  }, []);


  const [show, popupState] = useState(false)
  const [classicModal, setClassicModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);

  return (
    <div>
      <Container>
        <NavBar setClassicModal={setClassicModal} popupState={popupState} setHistoryModal={setHistoryModal} />

        <div>
          <PopupLogin classicModal={classicModal} setClassicModal={setClassicModal} show={show} />
        </div>

        <div>
          <PopupHistory historyModal={historyModal} setHistoryModal={setHistoryModal} show={show} />
        </div>

        <Box>
          {/* <RegisterForm/> */}
        </Box>


        <Grid
          container
          direction="row"
          justify="center" //try justify
          alignItems="stretch">
          <Box>
            {" "}
            <PostsList posts={posts} />{" "}
          </Box>


          <Box
          width= '45%'
          heigth= '10%'
          >
            <Map />
          </Box>

        </Grid>
      </Container>

    </div>
  );
};

App;

//import Map from './components/Map/Map'


