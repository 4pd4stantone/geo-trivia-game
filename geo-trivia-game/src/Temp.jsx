import { useState, useEffect } from "react";
import "./index.css";


export default function App() {
  const [continent, setContinent] = useState(null);
  const [cities, setCities] = useState(null);
  const [index, setIndex] = useState(0)
  const [nameIndex, setNameIndex] = useState(0)

  
  



  

   
    

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