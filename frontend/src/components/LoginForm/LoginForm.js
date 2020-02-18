// import React from "react";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// import InputAdornment from "@material-ui/core/InputAdornment";
// import Icon from "@material-ui/core/Icon";
// // @material-ui/icons
// import Email from "@material-ui/icons/Email";
// import People from "@material-ui/icons/People";
// // core components
// import Header from "components/Header/Header.js";
// import HeaderLinks from "components/Header/HeaderLinks.js";
// import Footer from "components/Footer/Footer.js";
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
// import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import CardFooter from "components/Card/CardFooter.js";
// import CustomInput from "components/CustomInput/CustomInput.js";

// import styles from "assets/jss/material-kit-react/views/loginPage.js";
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


// const useStyles = makeStyles(styles);

// export default function LoginPage(props) {
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
//             labelText="First Name..."
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
//             labelText="Email..."
//             id="email"
//             formControlProps={{
//               fullWidth: true
//             }}
//             inputProps={{
//               type: "email",
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <Email className={classes.inputIconsColor} />
//                 </InputAdornment>
//               )
//             }}
//           />
//           <CustomInput
//             labelText="Password"
//             id="pass"
//             formControlProps={{
//               fullWidth: true
//             }}
//             inputProps={{
//               type: "password",
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <Icon className={classes.inputIconsColor}>
//                     lock_outline
//                             </Icon>
//                 </InputAdornment>
//               ),
//               autoComplete: "off"
//             }}
//           />
//         </CardBody>
//         <CardFooter className={classes.cardFooter}>
//           <Button simple color="primary" size="lg">
//             Get started
//                     </Button>
//         </CardFooter>
//       </form>
//     </Card>
//   );
// }
