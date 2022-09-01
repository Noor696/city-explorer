import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";




class Weather extends React.Component{
    render() {
        return(
            <>
            <div>
                {this.props.weatherData.map(item =>{
                    return(
                        <p> Data:{item.datetime}</p>
                        <p> Description: low of {item.low_temp},  high of {item.max_temp} with {item.description} </p>
                    )
                })
                }
            </div>
            </>
        )
    }
};





export default Weather;