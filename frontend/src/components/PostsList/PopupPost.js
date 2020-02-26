import React,{ useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
// @material-ui/icons
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";
// import RegisterForm from "../RegisterForm/RegisterForm"
import Button from "../CustomButtons/Button";
// core components
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
// import Button from "../CustomButtons/Button";
// import LoginForm from '../LoginForm/LoginForm'
import styles from "../../assets/jss/material-kit-react/views/componentsSections/javascriptStyles"
import axios from 'axios'
import UpdateForm from '../UpdateForm/UpdateForm.js'
import Roboto from '../../assets/jss/material-kit-react/components/typographyStyle'

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function PopUpPost(props) {

  const classes = useStyles();
  const [updateForm, setUpdateForm] = useState(false)
  const [user, setUser] = useState("");

  function applyPost (event)  {
    event.preventDefault()
    axios.post(`/api/message/${props.post.user_id}`, {from: props.user}).then(res => { //new route goes in here

    });
  }

  // Delete
  function deletePost(e) {
    e.preventDefault();

    axios.delete(
      `/api/posts/${props.post.id}/delete`,
      {
        data: { userId: props.user.id }
      }
      )
      .then(_response => {
        props.onClose()
      })
      .catch(function(error) {
        console.log(error);
      });

    props.getPosts();
  }

    console.log(props.post  ,"<-- theese are the posts in popupposts")

    return (
      <div width="25%" height='50%'>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6} lg={4}>
            <Dialog
              classes={{
                root: classes.center,
                paper: classes.modal
              }}
              open={props.post}
              TransitionComponent={Transition}
              keepMounted
              onClose={props.onClose}
              aria-labelledby="classic-modal-slide-title"
              aria-describedby="classic-modal-slide-description"
              >
              <DialogTitle
                id="classic-modal-slide-title"
                disableTypography
                className={classes.modalHeader}
                >
                <IconButton
                  className={classes.modalCloseButton}
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={() => {
                    props.onClose();
                    setUpdateForm(false)
                  }}
                  >
                  <Close className={classes.modalClose} />
                </IconButton>
              </DialogTitle>

              {updateForm ? (
                <div>
                  <DialogContent
                  id="classic-modal-slide-description"
                  className={classes.modalBody}
                  >
                  <div>
                  <div>
                  <div>
                  <UpdateForm
                    getPosts={props.getPosts}
                    post={props.post}
                    user={user}
                    setUser={setUser}
                    onClose={props.onClose}
                    hideUpdateForm={()=> setUpdateForm(false)}
                    />
                  </div>
                  </div>
                  <div>

                  </div>
                  </div>
                  </DialogContent>
                </div>
              ):(
                <div>
                  <DialogContent
                    id="classic-modal-slide-description"
                    className={classes.modalBody}
                    >
                    <div>
                      <div>
                        <div style={{fontFamily: Roboto, fontSize: 19, noWrap: false, wordWrap: false}}>

                          <p style={{fontSize: 21, fontWeight:900}}> {props.post.title}</p>
                          <p style={{noWrap: false, fontSize: 21}}> {props.post.description} </p>

                        </div>
                      </div>
                      <div>
                        {(props.user && props.user.type === "volunteer" ) && (
                          <Button
                            color="success"
                            block
                            style={{fontFamily: Roboto, fontSize: 19 }}
                            onClick={applyPost}
                            type="submit"
                            >
                            Apply
                          </Button>
                        )}
                      </div>
                    </div>
                  </DialogContent>
                  <DialogActions className={classes.modalFooter}>

                  {props.user && props.user.type === "service_provider" && (
                    <div>
                      <Button
                        onClick={() => setUpdateForm(true)}
                        color="danger"
                        simple
                        >
                        UPDATE
                      </Button>

                      <Button
                        onClick={(e) => deletePost(e)}
                        color="danger"
                        simple
                        >
                        DELETE
                      </Button></div>)}

                      <Button
                        onClick={props.onClose}
                        color="danger"
                        simple
                        >
                        CLOSE
                      </Button>

                      </DialogActions>
                    </div>
                  )}
            </Dialog>
          </GridItem>
        </GridContainer>
      </div>
    )
          }

