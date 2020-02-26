import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Roboto from '../../assets/jss/material-kit-react/components/typographyStyle'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import NavPills from '../NavPills/NavPills'
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import PanToolIcon from '@material-ui/icons/PanTool';
import AssignmentIcon from '@material-ui/icons/Assignment';
import styles from "../../assets/jss/material-kit-react/views/componentsSections/pillsStyle";
import "../../assets/jss/material-kit-react"

const useStyles = makeStyles(styles);


export default function About() {
  const classes = useStyles();
  return (
      <GridContainer className={classes.container}>
            <GridItem >
              <NavPills
                color="primary"
                tabs={[
                  {
                    tabButton: "About Us",
                    tabIcon: AccessibilityIcon,
                    tabContent: (
                      <span  style={{fontFamily: Roboto, fontSize: 19}}>
                        <p>
                        Committed is a non-profit initiative that connects both volunteers
                         and organizations in simple and intuitive way.
                         </p>
                         <p>
                        Our mission originates  from the need to have a simple and
                        straightforward access to the volunteers by the organizations
                         and from the volunteers to find a meaningful opportunity to contribute.

                        </p>
                      </span>
                    )
                  },
                  {
                    tabButton: "Apply",
                    tabIcon: PanToolIcon ,
                    tabContent: (
                      <span  style={{fontFamily: Roboto, fontSize: 19}}>
                        <p>
                        After registering, you will be able to see the opportunities
                         around you. Click on the opportunity to read its description
                         and click on the apply button to have your information sent
                         to the opportunity provider.
                        </p>
                        <p>
                        Both you and the opportunity provider will receive an email
                         with the details of the opportunity. Just wait for the
                         Organization to contact you back confirming the match.
                        </p>
                      </span>
                    )
                  },
                  {
                    tabButton: "Offer Opportunities",
                    tabIcon: AssignmentIcon,
                    tabContent: (
                      <span  style={{fontFamily: Roboto, fontSize: 19}}>
                        <p>
                          Collaboratively administrate empowered markets via
                          plug-and-play networks. Dynamically procrastinate B2C
                          users after installed base benefits.
                        </p>

                        <p>
                          Dramatically visualize customer directed convergence
                          without revolutionary ROI. Collaboratively
                          administrate empowered markets via plug-and-play
                          networks. Dynamically procrastinate B2C users after
                          installed base benefits.
                        </p>

                      </span>
                    )
                  }
                ]}
              />
            </GridItem>
        </GridContainer>
  )
}
