import React,{useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../CustomButtons/Button";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";
import qs from 'qs';

import styles from "../../assets/jss/material-kit-react/views/loginPage";


const useStyles = makeStyles(styles);

export default function CreatePosts(props) {
  const [opportunity, setOpportunity] = useState({})

  useEffect(() => {
    console.log({ opportunity });
  }, [opportunity])

  const newPost = () => {
    axios.post(`/api/posts/new`, qs.stringify({
      ...opportunity,
      date_posted: Date.now(),
      user_id: props.user.id,
    })).then(res => {
      setOpportunity(res.data);
      window.location = "/index";
      //make opportunity component re render here!
    });
  }

  const handleInputChange = (event) => {
    console.log({ event });
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.id;

    setOpportunity({
      ...opportunity,
      [id]: value
    });
  }

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();

  return (
    <Card>
      <form onSubmit={(event) => event.preventDefault()} >
        <CardBody>
          <CustomInput
            labelText="Category"
            id="type"
            formControlProps={{fullWidth: true}}
            inputProps={{
              onChange: handleInputChange,
              autoComplete: "off" }}
          />
          <CustomInput
            labelText="Position Name"
            id="title"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              type: "title",
              onChange: handleInputChange,
              autoComplete: "off"
            }}
          />
          <CustomInput
            labelText="Description"
            id="description"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: handleInputChange,
              type: "description",
              autoComplete: "off"
            }}
          />
          <CustomInput
            labelText="Address"
            id="address"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: handleInputChange,
              type: "address",
              autoComplete: "off"
            }}
          />
        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <Button onClick={newPost} type="submit" simple color="primary" size="lg">
            Submit
          </Button>
        </CardFooter>
      </form>

    </Card>
    );
  }
