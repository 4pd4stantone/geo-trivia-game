import { useState, useEffect } from "react";
import "./index.css";


export default function App() {
  const [continent, setContinent] = useState(null);
  const [cities, setCities] = useState(null);
  const [index, setIndex] = useState(0)
  const [nameIndex, setNameIndex] = useState(0)

  
  const apiKeyPIXABAY = import.meta.env.VITE_PIXABAY_API_KEY 
  const apiKeyGEONAMES = import.meta.env.VITE_GEONAMES_API_KEY


  const getCityPics = async () => {
    try {
      const response = await fetch(`https://pixabay.com/api/?key=${apiKeyPIXABAY}&category=places&q=new+york&image_type=photo&safesearch=true`
      );
      const data = await response.json();
      console.log(data)
      const imgIndex = index
      // const cityImg = data.hits[6].largeImageURL;
      setCities(data.hits[imgIndex].largeImageURL);
      console.log(cities);
    } catch (e) {
      console.error(e);
    }
     
  }

    const getCityNames = async () => {
    try {
      const response = await fetch(`http://api.geonames.org/citiesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&lang=de&username=${apiKeyGEONAMES}`
      );
     const data = await response.json();
      console.log(data)
      setContinent(data.geonames[nameIndex].toponymName);
      console.log(continent);
    } catch (e) {
      console.error(e);
    }
  }
    

    function handleClick() {
      console.log("clicked");
      setIndex(prev => prev + 1)
      getCityPics(cities)
    }
    function handleName() {
      getCityNames(continent)
      console.log("clicked");
      
    }

    return (
      <div id="city-box">
        <p id="city-name">City Name</p>
        <p id="population">-Population</p>
        <div>
          <img id="city-img" src={cities} />
        </div>
        <button id="city-btn" onClick={handleClick}>
          Get New City
        </button>
        <br />
        <br />
        <button id="city-Name" onClick={handleName}>
          Get City Name
        </button>
        <p>{continent}</p>
      </div>
    );

}