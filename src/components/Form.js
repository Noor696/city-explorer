import React from "react";
import axios from "axios";
import Form from 'react-bootstrap/Form'

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
          mapFlag : false
        }
      }
    
    getLocationData = async (event)=>{
        event.preventDefault();
        const cityNameInput = event.target.city.value;
        console.log(cityNameInput);
        const URL = `https://eu1.locationiq.com/v1/search?key=${TOKEN}&q=${cityNameInput}&format=json`
        
        

    try
    {
    let resResult = await axios.get(URL);
    console.log(resResult.data[0]);
    this.setState({
      display_name : resResult.data[0].display_name,
      lon : resResult.data[0].lon,
      lat : resResult.data[0].lat,
      mapFlag : true
    })
    }
    catch {
        console.log('err');
      this.setState({
        errFlag : true,
        
      })
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

            <h3>display_name:{this.state.display_name}</h3>
            <p>lon:{this.state.lon}</p>
            <p>lat:{this.state.lat}</p>

            {this.state.mapFlag && <img src={`https://maps.locationiq.com/v3/staticmap?key=${TOKEN}&center=${this.state.lat},${this.state.lon}&zoom=${20}&size=610x300`} alt="map"></img>}

            {this.state.errFlag && <h4>Error: {this.state.error}</h4>}
           

        
        </>
    );
}
    }
    
    
        
    


export default Forms;