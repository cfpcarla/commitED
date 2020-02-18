import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Button from "../CustomButtons/Button";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import CustomInput from "../CustomInput/CustomInput";

import styles from "../../assets/jss/material-kit-react/views/loginPage";


const useStyles = makeStyles(styles);

export default function CreatePostPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <Card>
      <form>
        <CardBody>
          <CustomInput
            labelText="Position Name"
            id="first"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "text",
              endAdornment: (
                <InputAdornment position="end">
                  <People className={classes.inputIconsColor} />
                </InputAdornment>
              )
            }}
          />
          <CustomInput
            labelText="Description"
            id="description"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "text"
            }}
          />
          <CustomInput
            labelText="Address"
            id="address"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "address",
              endAdornment: (
                <InputAdornment position="end">
                  <Icon className={classes.inputIconsColor}>
                  </Icon>
                </InputAdornment>
              ),
              autoComplete: "off"
            }}
          />
           <CustomInput
            labelText="Hours"
            id="hours"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "text",
            }}
          />
           <CustomInput
            labelText="Number of opportunities"
            id="vacancies"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "text",
              autoComplete: "off"
            }}
          />
        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <Button simple color="primary" size="lg">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
