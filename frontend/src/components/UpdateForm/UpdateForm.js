import React,{useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "../CustomButtons/Button";
import Card from "../Card/Card";
import CardBody from "../Card/CardBody";
import CardFooter from "../Card/CardFooter";
import CustomInput from "../CustomInput/CustomInput";
import axios from "axios";

import styles from "../../assets/jss/material-kit-react/views/loginPage";


const useStyles = makeStyles(styles);

export default function UpdateForm(props) {
  const [opportunity, setOpportunity] = useState(props.post)

  useEffect(() => {
    console.log({ opportunity });
  }, [opportunity])

  // Update
  function updateForm(e) {
    e.preventDefault();
    axios.put(
        `/api/posts/${props.post.id}/update`,
        {
          data: {
            ...opportunity,
            userId: props.user.id
          }
        }
    )
      .then(_response => {
        props.getPosts();
        props.onClose();
        props.hideUpdateForm();
      })
      .catch(function(error) {
        console.log(error);
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

  console.log(props,"<-- theese are the posts in update form")

  return (
    <Card>
      <form onSubmit={(event) => event.preventDefault()}>
        <CardBody>
          <CustomInput
            labelText="Category"
            id="type"
            formControlProps={{fullWidth: true}}
            inputProps={{
              onChange: handleInputChange,
              defaultValue:props.post.type,
              autoComplete: "on" }} // turn off on demo day
          />
          <CustomInput
            labelText="Position Name"
            id="title"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              defaultValue:props.post.title,
              type: "title",
              onChange: handleInputChange,
              autoComplete: "on"
            }}
          />
          <CustomInput
            labelText="Description"
            id="description"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              defaultValue:props.post.description,
              onChange: handleInputChange,
              type: "description",
              autoComplete: "on"
            }}
          />
          <CustomInput
            labelText="Address"
            id="address"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              defaultValue:props.post.address,
              onChange: handleInputChange,
              type: "address",
              autoComplete: "on"
            }}
          />
        </CardBody>
        <CardFooter className={classes.cardFooter}>
          <Button onClick={updateForm} type="submit" simple color="primary" size="lg">
            Submit
          </Button>
          <Button
            onClick={props.hideUpdateForm}
            color="danger"
            simple
            >
            Cancel
          </Button>
        </CardFooter>
      </form>

    </Card>
    );
  }