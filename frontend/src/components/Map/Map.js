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

  setUserAndOpportunitiesLocations(user, opportunities) {
    axios.get(`/api/user/${user.id}/get-lat-and-lng`).then(userResponse => {
      const { latitude, longitude } = userResponse.data[0];
      this.setState({
        currentLocation: {
          lat: latitude,
          lng: longitude
        },
        opportunities: opportunities
      });
    })
  }

  //axios get lat and lng from database
  componentDidMount() {
    axios.get(`/api/opportunities/get-lat-and-lng`).then(opportunitiesResponse => {
      const opportunities = [...opportunitiesResponse.data.rows]
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.setUserAndOpportunitiesLocations(user, opportunities)
      } else {
        this.setState({ opportunities: opportunities })
      }
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
        <Marker onClick={this.onMarkerClick} name={'You are here'} />
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
