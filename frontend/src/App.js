import React from 'react';
import './App.scss';
import { Container, Paper, Grid } from '@material-ui/core'
import NavBar from './components/NavBar/NavBar.js'

export default function App() {

  return (
    <div>
      <Container>
        <NavBar />
        <Grid
          container
          direction="row"
          justify="center"
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
