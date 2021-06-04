import React, { Component } from "react";
import "./style.css";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import InfoWindowEx from "./InfoWindowEx";
import ReactHtmlParser from "react-html-parser";
import data from "./data";
import axios from "axios";

export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModal: false,
      isFilterShow: false,
      isSummary: false,
      filter: {
        start: null,
        end: null,
        organization: "",
        location: "",
        category: "",
      },
      filterData: {},
      newMarkers: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      markers: data,
      mapCenter: {
        lat: 30.9709,
        lng: 72.4826,
      },
      data: data,
    };
  }
  //  Fetching data from database
  // componentDidMount() {
  //   const fetchData = async () => {
  //     await axios
  //       .get("https://jsonplaceholder.typicode.com/todos")
  //       .then((res) => {
  //         this.setState({
  //           markers: res.data,
  //           data: res.data,
  //         });
  //       });
  //   };
  //   fetchData();
  // }
  // Handle Change
  handleChange = ({ target }) => {
    this.setState({
      filter: {
        ...this.state.filter,
        [target.name]: target.value,
      },
    });
  };

  // Handle Filter
  handleFilter = () => {
    let markers = this.state.markers;
    if (this.state.filter.start) {
      var startDate = new Date(this.state.filter.start);
      markers = markers.filter(
        (item) => new Date(item.Date_of_Attack) >= startDate
      );
    }
    if (this.state.filter.end) {
      var endDate = new Date(this.state.filter.end);
      markers = markers.filter(
        (item) => new Date(item.Date_of_Attack) <= endDate
      );
    }
    if (this.state.filter.organization !== "") {
      markers = markers.filter(
        (item) => item.Type_of_Org === this.state.filter.organization
      );
    }
    if (this.state.filter.category !== "") {
      markers = markers.filter(
        (item) => item.Attack_Category === this.state.filter.category
      );
    }
    if (this.state.filter.location !== "") {
      markers = markers.filter((item) => {
        return item.Country.toLowerCase().includes(
          this.state.filter.location.toLowerCase()
        );
      });
    }
    // console.log(markers);
    this.setState({
      isFilterShow: true,
      isModal: false,
      markers: markers,
    });
  };
  // Marker Click
  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props.data,
      activeMarker: marker,
      showingInfoWindow: true,
    });
  };
  // Get UTC Date
  getUTCDate = (date) => {
    var month = date.getUTCMonth() + 1;
    var day = date.getUTCDate();
    var year = date.getUTCFullYear();
    var newdate = day + "/" + month + "/" + year;
    return newdate;
  };
  // Get Date
  getDate = (date) => {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var year = date.getFullYear();
    var newdate = day + "/" + month + "/" + year;
    return newdate;
  };
  // Map Click
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
      new window.google.maps.Size(50, 50)
    );
    return icon;
  };
  // Handle Summary
  handleSummary = () => {
    this.setState({
      isSummary: true,
      showingInfoWindow: false,
      activeMarker: null,
    });
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
    let socialMedia = this.markerStyle(
      "https://img.icons8.com/plasticine/2x/marker.png"
    );
    return (
      <div id="googleMaps">
        {this.state.isFilterShow && (
          <div className="filter-content">
            <i
              className="fas fa-times text-danger modal-icon"
              onClick={() =>
                this.setState({
                  isFilterShow: false,
                  filter: {
                    start: null,
                    end: null,
                    organization: "",
                    location: "",
                    category: "",
                  },
                  markers: data,
                })
              }
            ></i>
            {this.state.filter.start && (
              <div className="filter__option">
                <span className="filter__name">Start Date:</span>
                <span className="filter__value">
                  {this.getDate(this.state.filter.start)}
                </span>
              </div>
            )}
            {this.state.filter.end && (
              <div className="filter__option">
                <span className="filter__name">End Date:</span>
                <span className="filter__value">
                  {this.getDate(this.state.filter.end)}
                </span>
              </div>
            )}
            {this.state.filter.organization !== "" && (
              <div className="filter__option">
                <span className="filter__name">Organization:</span>
                <span className="filter__value">
                  {this.state.filter.organization}
                </span>
              </div>
            )}
            {this.state.filter.location !== "" && (
              <div className="filter__option">
                <span className="filter__name">Location:</span>
                <span className="filter__value">
                  {this.state.filter.location}
                </span>
              </div>
            )}
            {this.state.filter.category !== "" && (
              <div className="filter__option">
                <span className="filter__name">Category:</span>
                <span className="filter__value">
                  {this.state.filter.category}
                </span>
              </div>
            )}
          </div>
        )}

        <button
          className="btn btn-dark filter-btn"
          onClick={() =>
            this.setState({
              isModal: true,
              isFilterShow: false,
            })
          }
        >
          Search
        </button>
        {this.state.isModal && (
          <div className="filter-modal">
            <div className="filter-position">
              <div className="filter__content p-5">
                <i
                  className="fas fa-times text-danger modal-icon"
                  onClick={() =>
                    this.setState({
                      isModal: false,
                    })
                  }
                ></i>
                <div className="w-100 d-flex">
                  <div className="form-group w-50 mr-2">
                    <label htmlFor="startDate" className="filter__date">
                      Start Date:
                    </label>
                    <DatePicker
                      className="form-control start__date"
                      dateFormat="dd/MM/yyyy"
                      selected={this.state.filter.start}
                      onChange={(date) =>
                        this.setState({
                          filter: {
                            ...this.state.filter,
                            start: date,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="form-group w-50 ml-2">
                    <label htmlFor="endDate" className="filter__date">
                      End Date:
                    </label>
                    <DatePicker
                      className="form-control end__date"
                      dateFormat="dd/MM/yyyy"
                      selected={this.state.filter.end}
                      onChange={(date) =>
                        this.setState({
                          filter: {
                            ...this.state.filter,
                            end: date,
                          },
                        })
                      }
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="organization">Organization</label>
                  <select
                    className="form-control"
                    name="organization"
                    id="organization"
                    value={this.state.filter.organization}
                    onChange={this.handleChange}
                  >
                    <option value="">Select Organization</option>
                    <option value="Govt">Govt</option>
                    <option value="Private">Private</option>
                    <option value="Bank">Bank</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    name="location"
                    onChange={this.handleChange}
                    className="form-control"
                    id="location"
                    placeholder="Location"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="category">Categorty</label>
                  <select
                    className="form-control"
                    name="category"
                    id="category"
                    value={this.state.filter.category}
                    onChange={this.handleChange}
                  >
                    <option value="">Select Categorty</option>
                    <option value="Data Breach">Data Breach</option>
                    <option value="Cybersecurity">Cyber Security</option>
                    <option value="Malware">Malware</option>
                    <option value="Vulnerability">Vulnerabilities</option>
                    <option value="Cybercrime">Cyber Crime</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={this.handleFilter}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.isSummary && (
          <div className="filter-modal">
            <div className="filter-position">
              <div className="filter__content summary__data">
                <i
                  className="fas fa-times text-danger modal-icon"
                  onClick={() => {
                    this.setState({
                      isSummary: false,
                    });
                  }}
                ></i>
                <div className="summary__content">
                  <h1>{this.state.selectedPlace.Attack_name}</h1>
                  <p>
                    Category:{" "}
                    <span>{this.state.selectedPlace.Attack_Category}</span>
                  </p>
                  <p>
                    Organization:{" "}
                    <span>{this.state.selectedPlace.Type_of_Org}</span>
                  </p>
                  <p>
                    Date of Attack:{" "}
                    <span>
                      {this.getUTCDate(
                        new Date(this.state.selectedPlace.Date_of_Attack)
                      )}
                    </span>
                  </p>
                  <p>
                    Lost Money:{" "}
                    <span>{this.state.selectedPlace.Lost_Amount}</span>
                  </p>
                  <p>
                    Country: <span>{this.state.selectedPlace.Country}</span>{" "}
                    City: <span>{this.state.selectedPlace.City}</span>
                  </p>
                  <p>Attack KeyPoints:</p>
                  <ul>
                    {Object.keys(this.state.selectedPlace.Attack_KeyPoints).map(
                      (keyName, i) => (
                        <li className="travelcompany-input" key={i}>
                          {this.state.selectedPlace.Attack_KeyPoints[keyName]}
                        </li>
                      )
                    )}
                  </ul>
                  <p>
                    Author Name:{" "}
                    <span>{this.state.selectedPlace.Author_Name}</span>
                  </p>
                  <p>
                    Access Date:{" "}
                    <span>{this.state.selectedPlace.Access_Date}</span>
                  </p>
                  <p>
                    Summary:{" "}
                    <span>
                      {ReactHtmlParser(this.state.selectedPlace.Summary)}
                    </span>
                  </p>
                  <a
                    href="https://www.welivesecurity.com/2021/02/16/romance-scams-2020-breaking-hearts-wallets-records/"
                    className="float-right mr-3 mb-2"
                    target="_blank"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
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
          zoom={2}
          onClick={this.onMapClicked}
        >
          {this.state.markers.map((marker) => (
            <Marker
              title={marker.Attack_Category}
              icon={
                marker.Attack_Category === "Data Breach"
                  ? dataBreach
                  : marker.Attack_Category === "Cybersecurity"
                  ? cyberSecurity
                  : marker.Attack_Category === "Malware"
                  ? malware
                  : marker.Attack_Category === "Vulnerability"
                  ? vulnerabilities
                  : marker.Attack_Category === "Social Media"
                  ? socialMedia
                  : ""
              }
              position={{
                lat: parseInt(marker.Latitude),
                lng: parseInt(marker.Longitude),
              }}
              onClick={this.onMarkerClick}
              // name={marker.title}
              // detail={marker.detail}
              // url={marker.url}
              data={marker}
            />
          ))}
          <InfoWindowEx
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div className="info__detail">
              <p>{ReactHtmlParser(this.state.selectedPlace.Summary)}</p>
              <span
                className="float-right"
                title="Summary"
                onClick={this.handleSummary}
              >
                <i className="fas fa-chevron-right"></i>
              </span>
            </div>
          </InfoWindowEx>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "<Your Api key>",
})(MapContainer);
