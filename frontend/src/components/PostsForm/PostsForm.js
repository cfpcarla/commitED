import React,{useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
// @material-ui/icons
// import Email from "@material-ui/icons/Email";
// import People from "@material-ui/icons/People";
// core components
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

      <form onSubmit={(event) => event.preventDefault()}>
        <CardBody>
          <CustomInput
            labelText="Category"
            id="type"
            formControlProps={{fullWidth: true}}
            inputProps={{
              onChange: handleInputChange,
              autoComplete: "on" }} // turn off on demo day
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
              onChange: handleInputChange,
              type: "address",
              autoComplete: "on"
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

  //async not needed - rodrigo
  // const [newPosts, setNewPosts] =  useState([]);
  // const newPost =  () => {
  //   axios.post(`http://localhost:8080/posts/new`, this.state).then(res => {
  //     setNewPosts(res.data);
  //   });
  // };


  //console.log("new posts in app.jds",newPosts)

  // export default class CreatePosts extends React.Component {

  //   constructor(props) {
  //     super(props);
  //     this.state = {

  //       type:'',
  //       description:"",
  //       title:'',
  //       date_posted:Date.now(),
  //       user_id: 1,
  //       address:''

  //     };
  //     this.newPost = this.newPost.bind(this)//refers to component not function itself
  //     this.handleInputChange = this.handleInputChange.bind(this);
  //   }
  //    newPost (event)  {
  //      event.preventDefault()
  //     axios.post(`http://localhost:8080/posts/new`, this.state).then(res => {
  //       this.setOpportunity(res.data);
  //     });
  //   }

  //   handleInputChange(event) {
  //     const target = event.target;
  //     const value = target.type === 'checkbox' ? target.checked : target.value;
  //     const name = target.name;

  //     this.setOpportunity({
  //       [name]: value
  //     });
  //   }

  //   render() {
  //     console.log(this.state)

  //     return (
  //       <form>

  //         {/* <br />
  //         <label>
  //           Category:
  //           <input
  //             name="type"
  //             type="text"
  //             value={this.state.type}
  //             onChange={this.handleInputChange} />
  //         </label>

//         <br /> */}
//         {/* <label>
//           Title:
//           <input
//             name="title"
//             type="text"
//             value={this.state.title}
//             onChange={this.handleInputChange} />
//         </label>
//         <br /> */}
//         {/* <label>
//           Description:
//           <input
//             name="description"
//             type="text"
//             value={this.state.description}
//             onChange={this.handleInputChange} />
//         </label>
//         <br /> */}
//         <label>
//           Address:
//           <input
//             name="address"
//             type="text"
//             value={this.state.address}
//             onChange={this.handleInputChange} />
//         </label>


//         <div><button onClick={this.newPost} type="submit" >Submit</button></div>
//       </form>
//     );
//   }
// }
