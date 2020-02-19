import React, { useState, useEffect } from "react";
import './App.scss';
import {makeStyles} from '@material-ui/core/styles'
import { Container, Box, Grid,  Paper} from '@material-ui/core'
import { sizing } from '@material-ui/core'
import NavBar from './components/NavBar/NavBar.js'
import PostsList from "./components/PostsList/PostsList";
import Map from './components/Map/Map'
import PopupLogin from "./components/PopupLogin/PopupLogin"
import PopupHistory from "./components/PopupHistory/PopupHistory"
import RegisterForm from "./components/RegisterForm/RegisterForm"
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: '50%',
    width:'50%',
    padding: theme.spacing(2),
    textAlign: 'left',
  },
}));

export default function App() {
  const [posts, setPosts] = useState([]);

  useEffect( () => {
    axios.get(`http://localhost:8080/posts`).then(res => {
      setPosts(res.data);
    });
  }, []);

  const [show, popupState] = useState(false)
  const [classicModal, setClassicModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const classes = useStyles();

  return (

    <div>
      <NavBar setClassicModal={setClassicModal} popupState={popupState} setHistoryModal={setHistoryModal}/>
      <div>
          <PopupLogin classicModal={classicModal} setClassicModal={setClassicModal} show={show} />
        </div>

        <div>
          <PopupHistory historyModal={historyModal} setHistoryModal={setHistoryModal} show={show} />
        </div>

      <Container className={classes.root}>
        <Grid
          container
          direction="row"
          justify="left" //try justify
          alignItems="stretch">
          <Box className={classes.paper} >
            {" "}
            <PostsList posts={posts} />{" "}
          </Box>

          <Box>
            <Map />
          </Box>
        </Grid>
      </Container>

    </div>
  );
};

