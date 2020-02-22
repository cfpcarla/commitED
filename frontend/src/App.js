import React, { useState, useEffect } from "react";
import "./App.scss";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Box, Grid, Paper } from "@material-ui/core";
import { sizing } from "@material-ui/core";
import NavBar from "./components/NavBar/NavBar.js";
import PostsList from "./components/PostsList/PostsList";
import Map from "./components/Map/Map";
import PopupLogin from "./components/PopupLogin/PopupLogin";
import CreatePosts from "./components/PostsForm/PostsForm";
import PopupHistory from "./components/PopupHistory/PopupHistory";
import RegisterForm from "./components/RegisterForm/RegisterForm";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    height: "50%",
    width: "50%",
    padding: theme.spacing(2),
    textAlign: "left"
  }
}));
// function List({ list }) {
//   if (!list) {
//     return null;
//   }
//   if (!list.length) {
//     return <p>Sorry, the list is empty.</p>;
//   } else {
//     return (
//       <div>
//         {list.map(item => (
//           <Item item={item} />
//         ))}
//       </div>
//     );
//   }
// }
export default function App() {
  const classes = useStyles();

  const [posts, setPosts] = useState([]);
  const [show, popupState] = useState(false);
  const [classicModal, setClassicModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  //const [mode, setMode] = useState('view')
  const [user, setUser] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    axios.get(`/api/posts`).then(res => {
      setPosts(res.data);
    });

    // todo: remove once you're all set up
    const user = JSON.parse(localStorage.getItem('user'));
    setUser(user);
  }, []); //make a function to get called after a new post

  return (
    <div>
      <NavBar
        user={user}
        setClassicModal={setClassicModal}
        popupState={popupState}
        setHistoryModal={setHistoryModal}
      />

      <div></div>

      <div>
        <PopupLogin
          user={user}
          setUser={setUser}
          error={error}
          setError={setError}
          classicModal={classicModal}
          setClassicModal={setClassicModal}
          show={show}
        />
      </div>

      <div>
        <PopupHistory
          user={user}
          setUser={setUser}
          error={error}
          setError={setError}
          historyModal={historyModal}
          setHistoryModal={setHistoryModal}
          show={show}
        />
      </div>
      <Box>
        {user && user.type === "service_provider" && (<CreatePosts user={user} setUser={setUser} />)}
      </Box>
      <Box>
        <Paper>
          <PostsList
            user={user}
            setUser={setUser}
            posts={posts}
          />
        </Paper>
      </Box>
      <br />

      <Container className={classes.root}>
        <Grid
          container
          direction="row"
          justify="flex-start" //try justify
          alignItems="stretch">
          <Box className={classes.paper}>
            <PostsList posts={posts} />{" "}
          </Box>

          <Box>
            <Map />
          </Box>
        </Grid>
      </Container>
    </div>
  );
}
