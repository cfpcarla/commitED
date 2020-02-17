import React from 'react';
import './App.scss';
import { Container, Paper, Grid } from '@material-ui/core'
import NavBar from './components/NavBar/NavBar.js'
import PostsLIst from './components/PostsList/PostsList'
import Map from './components/Map/Map'

export default function App() {
//on placeholder 1 insert <PostsList/>
//on placeholder 2 insert <Map/>

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
          <Paper>1</Paper>
          <Paper>2</Paper>
        </Grid>
      </Container>

    </div>
  );
};

App;
