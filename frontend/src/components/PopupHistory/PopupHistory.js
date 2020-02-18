import React, {useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Tooltip from "@material-ui/core/Tooltip";
import Popover from "@material-ui/core/Popover";
// @material-ui/icons
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import Close from "@material-ui/icons/Close";

// core components
import GridContainer from "../Grid/GridContainer.js";
import GridItem from "../Grid/GridItem.js";
import Button from "../CustomButtons/Button";
import LoginForm from '../LoginForm/LoginForm'
import styles from "../../assets/jss/material-kit-react/views/componentsSections/javascriptStyles"

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function PopUpHistory(props) {
  const classes = useStyles();

  return(
    // className={classNames(classes.main, classes.mainRaised)}
    <div >
    <GridContainer>
      <GridItem xs={12} sm={12} md={6} lg={4}>
        <Dialog
          classes={{
            root: classes.center,
            paper: classes.modal
          }}
          open={props.historyModal}
          TransitionComponent={Transition}
          keepMounted
          onClose={() => props.setHistoryModal(false)}
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
              onClick={() => props.setHistoryModal(false)}
            >
              <Close className={classes.modalClose} />
            </IconButton>
            <h4 className={classes.modalTitle}>Login/Register</h4>
          </DialogTitle>
          <DialogContent
            id="classic-modal-slide-description"
            className={classes.modalBody}
          >
            <p>

              History

            </p>
          </DialogContent>
          <DialogActions className={classes.modalFooter}>
            <Button color="transparent" simple>
              Nice Button
            </Button>
            <Button
              onClick={() => props.setHistoryModal(false)}
              color="danger"
              simple>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </GridItem>
    </GridContainer>
    </div>
  )
}
