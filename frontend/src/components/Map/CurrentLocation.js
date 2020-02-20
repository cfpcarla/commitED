import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";

const mapStyles = {
  map: {
    position: 'absolute',
    width: '50%',
    height: '50%'
  }
};
//make our component stateful,
export class CurrentLocation extends React.Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.initialCenter;
     //I dont know if is necessary/ how to pass this
    this.state = {
      currentLocation: {
        lat: lat,
        lng: lng
      }
    };
    //Axios GET for take latitude and longitude from the database and display in the map
  }

  //ComponentDidUpdate
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevState.currentLocation !== this.state.currentLocation) {
      this.recenterMap();
    }
  }
  //Recenter map
  recenterMap() {
    const map = this.map;
    const current = this.state.currentLocation;

    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.lat, current.lng);
      map.panTo(center);
    }
  }
//This will be handled by the componentDidMount() Lifecycle method which will set a call back to fetch the current location.
//Coomponent DipMount


  //axioos get foor take lat and lng from database
//feth lat and lng base in id
  componentDidMount() {
    console.log("YA");
    // axios.get(`http://localhost:8080/map`).then(res => {
    //   console.log('Hello', res);

    //   // pseude-code

    //   const data = res.data;

    //   this.setState({
    //     currentLocation: {
    //       lat: data.coords.latitude,
    //       lng: data.coords.longitude
    //     }
    //   });
    // });


//look after
    if (this.props.centerAroundCurrentLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const coords = pos.coords;
          this.setState({
            currentLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });
        });
      }
    }
    this.loadMap();
  }

  //Load Map
  //The loadMap() function is only called after the component has been rendered and grabs a reference to the DOM component to where we want our map to be placed
  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.currentLocation;
      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      );
      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  renderChildren() {
    const { children } = this.props;

    if (!children) return;

    return React.Children.map(children, c => {
      if (!c) return;
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google,
        mapCenter: this.state.currentLocation
      });
    });
  }
  //Render
  render() {
    const style = Object.assign({}, mapStyles.map);
    return (
      <div>
        <div style={style} ref="map">
          Loading map...
         </div>
        {this.renderChildren()}
      </div>
    );
  }
}
  export default CurrentLocation;

  CurrentLocation.defaultProps = {
    zoom: 14,
    initialCenter: {
      lat: 43.7183937,
      lng: -79.6589262
    },
    centerAroundCurrentLocation: false,
    visible: true
  };
