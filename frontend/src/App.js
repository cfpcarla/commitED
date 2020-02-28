import React, { useState, useEffect } from "react";
import "./App.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid} from "@material-ui/core";
import NavBar from "./components/NavBar/NavBar.js";
import PostsList from "./components/PostsList/PostsList";
import Map from "./components/Map/Map";
import PopupLogin from "./components/PopupLogin/PopupLogin";
import CreatePosts from "./components/PostsForm/PostsForm";
import axios from "axios";
import About from "../src/components/About/About.js"


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    alignItems: "center"
  },
  paper: {
    height: "100%",
    width: "100%",
    // padding: theme.spacing(2),
    textAlign: "left",
  }
}));

export default function App() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [show, popupState] = useState(false);
  const [classicModal, setClassicModal] = useState(false);
  //const [mode, setMode] = useState('view')
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);

  const getPosts = () => {
    axios.get(`/api/posts`)
      .then(res => {
        setPosts(res.data);
      });
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user')));
    getPosts();
  }, []); //make a function to get called after a new post

  function SideColumn(){
    return (
      <React.Fragment>
        <Grid item xs={12}>
          <div className={classes.paper}>
            <About/>
          </div>
        </Grid>
        {user && user.type === "service_provider" && (
        <Grid item xs={12}>
          <div className={classes.paper}>
          <CreatePosts user={user} setUser={setUser} />
          </div>
        </Grid>
        )}
        {(!user || user.type === "volunteer")  && (
        <Grid item xs={12}>
          <div className={classes.paper}>
          <Map />
          </div>
        </Grid>
        )}
      </React.Fragment>
    )
  }

  return (
    <div background="black">
      <header>
      <NavBar
        user={user}
        setUser={setUser}
        setClassicModal={setClassicModal}
        popupState={popupState}/>
      </header>
{/*=======================================================*/}
      <div>
        <PopupLogin
          user={user}
          setUser={setUser}
          error={error}
          setError={setError}
          classicModal={classicModal}
          setClassicModal={setClassicModal}
          show={show}/>
      </div>
{/*=======================================================*/}

      <Container className={classes.root} >

      <Grid
          container
          direction="row"
          justify="flex-start" //try justify
          alignItems="stretch">

        <Container item maxWidth="sm" padding="0">
          {(!user || user.type === "volunteer" ) && (
            <PostsList
              className={classes.paper}
              user={user}
              setUser={setUser}
              posts={posts}/>
          )}

          {user && user.type === "service_provider" && (
            <PostsList
            className={classes.paper}
              user={user}
              setUser={setUser}
              posts={posts}
              getPosts={getPosts}
            />
          )}
        </Container>
        <Container item xs={6} maxWidth="sm">
          <SideColumn/>
        </Container>
        </Grid>
      </Container>
    </div>
  );
}
