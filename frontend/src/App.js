import React, { useState, useEffect } from "react";
import './App.scss';
import {makeStyles} from '@material-ui/core/styles'
import { Container, Box, Grid,  Paper} from '@material-ui/core'
import { sizing } from '@material-ui/core'
import NavBar from './components/NavBar/NavBar.js'
import PostsList from "./components/PostsList/PostsList";
import Map from './components/Map/Map'
import PopupLogin from "./components/PopupLogin/PopupLogin"
import CreatePosts from "./components/PostsForm/PostsForm"
import PopupHistory from "./components/PopupHistory/PopupHistory"
import RegisterForm from "./components/RegisterForm/RegisterForm"
import PopupPosts from "./components/PostsList/PopupPost"
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: '100%',
    width:'50%',
    padding: theme.spacing(2),
    textAlign: 'center',
  },
}));

export default function App() {
  const [posts, setPosts] = useState([]);


  useEffect( () => {
    axios.get(`/api/posts`).then(res => {
      setPosts(res.data);
    });
  }, []); //make a function to get called after a new post

  const [show, popupState] = useState(false)
  const [classicModal, setClassicModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [postsModal, setPostsModal] = useState(false);

  const classes = useStyles();

  return (

    <div>
      <NavBar setClassicModal={setClassicModal} popupState={popupState} setHistoryModal={setHistoryModal}/>

        <div>
          <PopupLogin classicModal={classicModal} setClassicModal={setClassicModal} /*show={show} error = {error} setError= {setError}*//>
        </div>
        <div>
          <PopupPosts postsModal={postsModal} setClassicModal={setPostsModal} /*show={show} error = {error} setError= {setError}*//>
        </div>
        <div>
          <PopupHistory historyModal={historyModal} setHistoryModal={setHistoryModal} /*show={show} error = {error} setError= {setError}*//>
        </div>
        <Box>
        <CreatePosts /*error = {error} setError= {setError}*//>
        </Box>
        <div>
{/*if ORGANIZATION
    <Box>
        <Container className={classes.root}>
        <Grid
          container
          direction="row"
          justify="left" //try justify
          alignItems="stretch">
          <Box className={classes.paper} >
            {" "}
            <PostsList posts={posts} />
            {" "}
          </Box>
          <Box>
            {/* <RegisterForm/> */}
          {/*</div></Box>*/}
          </div>
          <Box>
          <Paper>
            {" "}
            <PostsList posts={posts} />{" "}
          </Paper>          </Box>
<br/>


      <Container className={classes.root}>
        <Grid
          container
          direction="row"
          justify="left" //try justify
          alignItems="stretch">
          <Box className={classes.paper} >
            {" "}
            <PostsList posts={posts} /*user={user}*//>
            {" "}
          </Box>
          <Box className={classes.paper} /*user={user}*/>
            <Map />
          </Box>
        </Grid>
      </Container>

    </div>
  );
};

