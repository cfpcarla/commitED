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
import FormControl from '@material-ui/core/FormControl';
import CardFooter from "../Card/CardFooter";
import CustomInput from "../CustomInput/CustomInput";
import axios from 'axios';
import qs from 'qs';

import styles from "../../assets/jss/material-kit-react/views/loginPage";


const useStyles = makeStyles(styles);

export default function RegisterPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;

  function handleSubmit(e) {
    e.preventDefault();
    //Register
    axios.post('http://localhost:8080/register', qs.stringify({
    name: e.target.first.value,
    address: e.target.address.value,
    phone: e.target.phone.value,
    email: e.target.email.value,
    password: e.target.pass.value
  })
  )
  .then(function (response) {
    console.log(response);
    if (response.status === 200) {
      window.location = "/index"
    } else {
      window.location = "/register"
    }
  })
  .catch(function (error) {
    console.log(error);
    window.location = "/register"
  });
  }

  //RETURN
  return (
    <Card>
    <form onSubmit={handleSubmit}>
    <CardBody>
    <CustomInput
    labelText="First Name..."
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
      labelText="Email..."
      id="email"
      formControlProps={{
        fullWidth: true
      }}
      inputProps={{
        type: "email",
        endAdornment: (
          <InputAdornment position="end">
          <Email className={classes.inputIconsColor} />
          </InputAdornment>
          )
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
          labelText="Phone"
          id="phone"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            type: "phone",
            endAdornment: (
              <InputAdornment position="end">
              <Icon className={classes.inputIconsColor}>
              lock_outline
              </Icon>
              </InputAdornment>
              ),
              autoComplete: "off"
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
                <Icon className={classes.inputIconsColor}>
                lock_outline
                </Icon>
                </InputAdornment>
                ),
                autoComplete: "off"
              }}
              />
              <CustomInput
              labelText="Confirmation"
              id="confirmation"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                type: "confirmation",
                endAdornment: (
                  <InputAdornment position="end">
                  <Icon className={classes.inputIconsColor}>
                  lock_outline
                  </Icon>
                  </InputAdornment>
                  ),
                  autoComplete: "off"
                }}
                />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                <Button type="submit" simple color="primary" size="lg">
                Get started
                </Button>
                </CardFooter>
                </form>
                </Card>
                );
              }