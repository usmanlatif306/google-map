import React, { Component } from "react";
import "./style.css";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // for google map places autocomplete
      address: "",
      category: props.category,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: [
        {
          title: "Current Location",
          lat: 30.8766857,
          lng: 72.3547799,
        },
        {
          title: "Peer Mahal",
          lat: 30.7659,
          lng: 72.4376,
        },
        {
          title: "Toba Tek Singh",
          lat: 30.9709,
          lng: 72.4826,
        },
      ],
      mapCenter: {
        lat: 30.9709,
        lng: 72.4826,
      },
    };
    console.log(props);
  }
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };
  markerStyle = (url) => {
    let icon = new window.google.maps.MarkerImage(
      url,
      null /* size is determined at runtime */,
      null /* origin is 0,0 */,
      null /* anchor is bottom center of the scaled image */,
      new window.google.maps.Size(60, 60)
    );
    return icon;
  };
  render() {
    let dataBreach = this.markerStyle(
      "http://simpleicon.com/wp-content/uploads/map-marker-5.png"
    );
    let cyberSecurity = this.markerStyle(
      "https://icon-library.com/images/marker-icon/marker-icon-1.jpg"
    );
    let malware = this.markerStyle(
      "https://advance-repro.com/wp-content/uploads/2017/02/Location_marker_pin_map_gps.png"
    );
    let vulnerabilities = this.markerStyle(
      "https://apprecs.org/gp/images/app-icons/300/8c/com.exlyo.mapmarker.jpg"
    );
    // let cyberCrime = this.markerStyle(
    //   "https://img.icons8.com/plasticine/2x/marker.png"
    // );

    return (
      <div id="googleMaps">
        <Map
          google={this.props.google}
          initialCenter={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
          center={{
            lat: this.state.mapCenter.lat,
            lng: this.state.mapCenter.lng,
          }}
          zoom={10}
          onClick={this.onMapClicked}
        >
          <Marker
            // icon={
            //   this.state.category === "dataBreach"
            //     ? dataBreach
            //     : this.state.category === "cyberSecurity"
            //     ? cyberSecurity
            //     : this.state.category === "malware"
            //     ? malware
            //     : this.state.category === "vulnerabilities"
            //     ? vulnerabilities
            //     : ""
            // }
            position={{
              lat: this.state.mapCenter.lat,
              lng: this.state.mapCenter.lng,
            }}
            onClick={this.onMarkerClick}
            name={"Toba Tek Singh"}
          />
          {/* {this.state.markers.map((marker) => (
            <Marker
              title={marker.title}
              position={{
                lat: marker.lat,
                lng: marker.lng,
              }}
              onClick={this.onMarkerClick}
              name={marker.title}
            />
          ))} */}

          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <p>{this.state.selectedPlace.name}</p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB_7LaXYVHpShoXQMOrXc18th6oHuHL1nM",
})(MapContainer);
