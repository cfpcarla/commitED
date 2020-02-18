import React, { useState, useEffect } from "react";
import "./App.scss";
import { Container, Paper, Grid } from "@material-ui/core";
import NavBar from "./components/NavBar/NavBar.js";
import PostsList from "./components/PostsList/PostsList";
//import Map from './components/Map/Map'
import axios from "axios";

export default function App() {

  const [posts, setPosts] = useState([]);

  useEffect(async () => {
    axios.get(`http://localhost:8080/posts`).then(res => {
      setPosts(res.data);
    });
  }, []);

  return (
    <div>
      <Container>
        <NavBar />
        <Grid
          container
          direction="row"
          justify="center" //try justify
          alignItems="stretch"
        >
          <Paper>
            {" "}
            <PostsList posts={posts} />{" "}
          </Paper>
          <Paper></Paper>
        </Grid>
      </Container>
    </div>
  );
}

App;
