import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Check from "@material-ui/icons/Check";
import Button from "../CustomButtons/Button";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
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
  const [checked, setChecked] = React.useState([24, 22]);

  function handleSubmit(e) {
    e.preventDefault();
    //Register
    axios.post('/api/register', qs.stringify({
    name: e.target.first.value,
    address: e.target.address.value,
    phone: e.target.phone.value,
    email: e.target.email.value,
    password: e.target.pass.value,
    type: checked.indexOf(21) === -1 ? 'volunteer' : 'service_provider'
  })
  )
  .then(function (response) {
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      props.setUser(response.data.user)
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

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

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

                </Icon>
                </InputAdornment>
                ),
                autoComplete: "off"
              }}
              />
                <div
                className={
                  classes.checkboxAndRadio +
                  " " +
                  classes.checkboxAndRadioHorizontal
                }
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      tabIndex={-1}
                      onClick={() => handleToggle(21)}
                      checkedIcon={<Check className={classes.checkedIcon} />}
                      icon={<Check className={classes.uncheckedIcon} />}
                      classes={{
                        checked: classes.checked,
                        root: classes.checkRoot
                      }}
                    />
                  }
                  classes={{ label: classes.label, root: classes.labelRoot }}
                  label="Are you an Organization looking for volunteers?"
                />
              </div>
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
