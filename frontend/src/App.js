import React, {useState} from 'react';
import './App.scss';
import { Container, Box, Grid } from '@material-ui/core'
import { sizing } from '@material-ui/core'
import NavBar from './components/NavBar/NavBar.js'
import PostsLIst from './components/PostsList/PostsList'
import Map from './components/Map/Map'
import PopupLogin from "./components/PopupLogin/PopupLogin"
import PopupHistory from "./components/PopupHistory/PopupHistory"
import RegisterForm from "./components/RegisterForm/RegisterForm"

export default function App() {
  //on placeholder 1 insert <PostsList/>
  //on placeholder 2 insert <Map/>

  const [show, popupState] = useState(false)
  const [classicModal, setClassicModal] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);

  return (
    <div>
      <Container>
        <NavBar setClassicModal={setClassicModal} popupState={popupState} setHistoryModal={setHistoryModal}/>
        <Grid
          container
          direction="row"
          justify="center" //try justify
          alignItems="stretch">

        <div>
          <PopupLogin classicModal={classicModal} setClassicModal={setClassicModal} show={show} />
        </div>

        <div>
          <PopupHistory historyModal={historyModal} setHistoryModal={setHistoryModal} show={show} />
        </div>

          <Box>
            {/* <RegisterForm/> */}
          </Box>
          <Box>
            <Map />
          </Box>

        </Grid>
      </Container>

    </div>
  );
};

App;
