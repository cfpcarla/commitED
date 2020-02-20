import React,{useState} from "react";
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
import axios from "axios";

import styles from "../../assets/jss/material-kit-react/views/loginPage";


const useStyles = makeStyles(styles);

// export default function CreatePostPage(props) {
//   const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
//   setTimeout(function () {
//     setCardAnimation("");
//   }, 700);
//   const classes = useStyles();
//   const { ...rest } = props;
//   return (
//     <Card>
//       <form>
//         <CardBody>
//           <CustomInput
//             labelText="Position Name"
//             id="first"
//             formControlProps={{
//               fullWidth: true
//             }}
//             inputProps={{
//               type: "text",
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <People className={classes.inputIconsColor} />
//                 </InputAdornment>
//               )
//             }}
//           />
//           <CustomInput
//             labelText="Description"
//             id="description"
//             formControlProps={{
//               fullWidth: true
//             }}
//             inputProps={{
//               type: "text"
//             }}
//           />
//           <CustomInput
//             labelText="Address"
//             id="address"
//             formControlProps={{
//               fullWidth: true
//             }}
//             inputProps={{
//               type: "address",
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <Icon className={classes.inputIconsColor}>
//                   </Icon>
//                 </InputAdornment>
//               ),
//               autoComplete: "off"
//             }}
//           />
//            <CustomInput
//             labelText="Hours"
//             id="hours"
//             formControlProps={{
//               fullWidth: true
//             }}
//             inputProps={{
//               type: "text",
//             }}
//           />
//            <CustomInput
//             labelText="Number of opportunities"
//             id="vacancies"
//             formControlProps={{
//               fullWidth: true
//             }}
//             inputProps={{
//               type: "text",
//               autoComplete: "off"
//             }}
//           />
//         </CardBody>
//         <CardFooter className={classes.cardFooter}>
//           <Button simple color="primary" size="lg">
//             Submit
//           </Button>
//         </CardFooter>
//       </form>
//     </Card>
//   );
// }
//async not needed - rodrigo
// const [newPosts, setNewPosts] =  useState([]);
// const newPost =  () => {
//   axios.post(`/api/posts/new`, this.state).then(res => {
//     setNewPosts(res.data);
//   });
// };


//console.log("new posts in app.jds",newPosts)

export default class CreatePosts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      type:'',
      description:"",
      title:'',
      date_posted:Date.now(),
      user_id: 1,
      address:''

    };
    this.newPost = this.newPost.bind(this)//refers to component not function itself
    this.handleInputChange = this.handleInputChange.bind(this);
  }
   newPost (event)  {
     event.preventDefault()
    axios.post(`/api/posts/new`, this.state).then(res => {
      this.setState(res.data);
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    console.log(this.state)

    return (
      <form>

        <br />
        <label>
          Category:
          <input
            name="type"
            type="text"
            value={this.state.type}
            onChange={this.handleInputChange} />
        </label>

        <br />
        <label>
          Title:
          <input
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Description:
          <input
            name="description"
            type="text"
            value={this.state.description}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Address:
          <input
            name="address"
            type="text"
            value={this.state.address}
            onChange={this.handleInputChange} />
        </label>


        <div><button onClick={this.newPost} type="submit" >Submit</button></div>
      </form>
    );
  }
}
