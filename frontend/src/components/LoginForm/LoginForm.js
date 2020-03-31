import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import Button from "../CustomButtons/Button";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import qs from "qs";

import styles from "../../assets/jss/material-kit-react/views/loginPage";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = useState("cardHidden");

  const classes = useStyles();
  const { ...rest } = props;

  function handleSubmit(e) {
    e.preventDefault();

    // POST LOGIN
    axios
      .post(
        "/api/login",
        qs.stringify({
          email: e.target.email.value,
          password: e.target.pass.value
        })
      )
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        props.setUser(response.data.user);
        window.location = "/index";
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardBody>
          <CustomInput
            labelText="Email..."
            id="email"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "email",
              endAdornment: (
                <InputAdornment position="end">
                </InputAdornment>
              )
            }}
          />
          <CustomInput
            labelText="Password"
            id="pass"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "password",
              endAdornment: (
                <InputAdornment position="end">
                </InputAdornment>
              ),
              autoComplete: "off"
            }}
          />
        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <Button type="submit" simple color="primary" size="lg">
            Submit
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
