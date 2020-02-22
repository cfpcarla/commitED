import React, { Component } from 'react';
import { GoogleApiWrapper, InfoWindow, Marker } from 'google-maps-react';
import CurrentLocation from './CurrentLocation';
import axios from 'axios';

const Test = (props) => (<div style={{backgroundColor: "black", color: "red"}}>{props.name}</div>);

//add state for state management
export class MapContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      opportunities: []
    };
  }

  //axios get lat and lng from database
  componentDidMount() {
    const user_id = localStorage.getItem('user_id'); //volunteer
    axios.get(`/api/user/${user_id}/get-lat-and-lng`)
    .then(res1 => {
      const { latitude, longitude } = res1.data[0];
      console.log(res1.data)
      //OPPORTUNITIES
      axios.get(`/api/opportunity/${user_id}/get-lat-and-lng`).then(res2 => {
        console.log("RES--->", res2.data.rows)

        // YOu have an array of opportunities with [{latitute, longitude}....]
        // FIgure out how to display ALL of the array on the map!!!

        this.setState({
          currentLocation: {
            lat: latitude,
            lng: longitude
          },
          opportunities: [
            ...res2.data.rows
          ]

        });

      })
    });

  }
  //add event handlers for when the map and the marker are clicked.
  //The onMarkerClick method is used to show the InfoWindow which is a component in the google-maps-react library which gives us the ability for a pop-up window showing details of the clicked place/marker.

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
//The onClose method is for closing the InfoWindow once a user clicks on the close button on the infoWindow.
  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };
  //component by adding our Marker and InfoWindow components to our render method
  render() {
    return (
      <CurrentLocation

        style={{height: '50%', width:'25%'}}
        centerAroundCurrentLocation
        google={this.props.google}
      >
        <Marker onClick={this.onMarkerClick} name={'current location'} />
        {this.state.opportunities.map((op, i) => (
        <Marker key={i}
        position={{lat: parseFloat(op.latitude), lng: parseFloat(op.longitude)}}
        title="HELLO" />))}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </CurrentLocation>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLEAPIKEY
})(MapContainer);
