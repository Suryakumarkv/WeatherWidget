import SearchBox from "./searchbox"
import InfoBox from "./InfoBox"
import { useState } from "react"

export default function WeatherApp() {
    
    const[weatherInfo, setWeathernfo] = useState({
      city:"Delhi",
      feelslike: 24.84,
      temp:25.05,
      tempMin:2.05,
      tempMax:28.05,
      humidity:47,
      weather:"haze",
    })

    let updateInfo = (info) => {
        setWeathernfo(info);
    }
    
    return(
        <div style={{textalign:"center"}}>
            <h2>Weather App By Delta</h2>
            <SearchBox  updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    ) 
}