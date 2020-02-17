import React, {useState} from 'react';
import './App.scss';
import { Container, Paper, Grid } from '@material-ui/core'
import NavBar from './components/NavBar/NavBar.js'
import PostsLIst from './components/PostsList/PostsList'
import Map from './components/Map/Map'
import PopupLogin from "./components/PopupLogin/PopupLogin"

export default function App() {
  //on placeholder 1 insert <PostsList/>
  //on placeholder 2 insert <Map/>

  const [show, popupState] = useState(false)
  const [classicModal, setClassicModal] = useState(false);


  return (
    <div>
      <Container>
        <NavBar setClassicModal={setClassicModal} popupState={popupState} />
        <Grid
          container
          direction="row"
          justify="center" //try justify
          alignItems="stretch"
        >
        <div>
          <PopupLogin classicModal={classicModal} setClassicModal={setClassicModal} show={show} />
        </div>

          <Paper>
            1
          </Paper>
          <Paper><Map /></Paper>
          <Paper>
          </Paper>
        </Grid>
      </Container>

    </div>
  );
};

App;
