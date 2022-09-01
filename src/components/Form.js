import React from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'
import Weather from "./Weather";

const TOKEN = "pk.9c694f14ad520d6e643d570d2a499d57";

class Forms extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          display_name : "",
          lon : "",
          lat : "",
          error : "sorry something went wrong!!",
          errFlag : false,
          mapFlag : false,
          weatherData: [],
        }
      }
    
    getLocationData = async (event)=>{
        event.preventDefault();
        const cityNameInput = event.target.city.value;
        console.log(cityNameInput);
        const URL = `https://eu1.locationiq.com/v1/search?key=${TOKEN}&q=${cityNameInput}&format=json`
        
        let resResult = await axios.get(URL);
        console.log(resResult.data[0]);

    try
    {
    
    this.setState({
      cityName : resResult.data[0].display_name,
      lon : resResult.data[0].lon,
      lat : resResult.data[0].lat,
      mapFlag : true,
      errFlag : false,
      weatherData: [],
    })
    }
    catch {
        console.log('err');
      this.setState({
        errFlag : true,
        mapFlag : false
        
      })
    }
    

    try
    {
    this.setState({
      mapFlag : true,
      errFlag : false,
      cityName : resResult.data[0].display_name,
      lon : resResult.data[0].lon,
      lat : resResult.data[0].lat,
      weatherData: weatherData.data,
    })
  }
  catch {
    this.setState({
      cityName : resResult.data[0].display_name,
      lon : resResult.data[0].lon,
      lat : resResult.data[0].lat,
      weatherData: [],
      errFlag : true,
    })
  }
  getWeatherData = async (data) => {
    const URL_HOST = `${process.env.REACT_APP_SERVER_LINK}weatherData?lon=${data.lon}&lat=${data.lat}`;
    try
    {
    const weatherData = await axios.get(URL_HOST);
    this.setState({
      cityName : data.display_name,
      lon : data.lon,
      lat : data.lat,
      weatherData: weatherData.data,
    })}
    catch {
    this.setState({
      weatherData: []
      })}
  }




  }
  render() {
    return(
        <>
        <div>
            <Form onSubmit ={this.getLocationData}>
                <input type="text" name="city" placeholder="Enter a City name" />
                <button type="submit">Explore!</button>
            </Form>
            </div>

            <h3>cityName:{this.state.cityName}</h3>
            <p>lon:{this.state.lon}</p>
            <p>lat:{this.state.lat}</p>

            {this.state.mapFlag && <img src={`https://maps.locationiq.com/v3/staticmap?key=${TOKEN}&center=${this.state.lat},${this.state.lon}&zoom=${20}&size=610x300`} alt="map"></img>}

            {this.state.errFlag && <h4>Error: {this.state.error}</h4>}

          <Weather 
             weatherData={this.state.weatherData}
          />


        
        </>
    );
}
    }
    
    
        
    


export default Forms;