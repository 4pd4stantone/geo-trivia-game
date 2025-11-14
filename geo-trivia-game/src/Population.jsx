import { useState, useEffect } from "react";
import logo from './assets/geo-trivia-logo.png'

export default function Population() {
  const [continent, setContinent] = useState(null);
  const [cities, setCities] = useState([])

  const coordinates = {
    europe: {
      north: 71,
      south: 35,
      east: 40,
      west: -10,
    },
    northAmerica: {
      north: 83,
      south: 7,
      east: -52,
      west: -168,
    },
    asia: {
      north: 81,
      south: -11,
      east: 180,
      west: 25,
    },
    southAmerica: {
      north: 13,
      south: -56,
      east: -35,
      west: -81,
    },
    africa: {
      north: 37,
      south: -35,
      east: 52,
      west: -17,
    },
    australia: {
      north: -10,
      south: -44,
      east: 154,
      west: 112,
    },
  };

  function handleContinent(e) {
    console.log(continent);
    const selected = e.target.name;
    setContinent(selected);
    const coords = coordinates[selected]
    getCityNames(coords);
  }
  const apiKeyGEONAMES = import.meta.env.VITE_GEONAMES_API_KEY;

  function shuffleArray(citiesArray) {
    for (let i = citiesArray.length - 1; i  > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [citiesArray[i], citiesArray[j]] = [citiesArray[j], citiesArray[i]]
    }
    return setCities(citiesArray)
  }

  const getCityNames = async ({north, south, east, west}) => {
    try {
      const response = await fetch(
        `http://api.geonames.org/citiesJSON?north=${north}&south=${south}&east=${east}&west=${west}&lang=de&username=${apiKeyGEONAMES}`
      );
      const data = await response.json();
      const citiesArray = data.geonames.map((city, i) => ({cityName: city.toponymName, populationSize: city.population}))
      console.log(citiesArray)
      return shuffleArray(citiesArray);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
      console.log(continent);
    console.log(cities)
  }, [continent, cities]);

  return (
    <main>
      <section id="continent-btns">
        <button
          name="northAmerica"
          className="continent-btn"
          onClick={handleContinent}
        >
          North America
        </button>
        <button
          name="southAmerica"
          className="continent-btn"
          onClick={handleContinent}
        >
          South America
        </button>
        <button
          name="europe"
          className="continent-btn"
          onClick={handleContinent}
        >
          Europe
        </button>
        <button
          name="africa"
          className="continent-btn"
          onClick={handleContinent}
        >
          Africa
        </button>
        <button name="asia" className="continent-btn" onClick={handleContinent}>
          Asia
        </button>
        <button
          name="australia"
          className="continent-btn"
          onClick={handleContinent}
        >
          Australia
        </button>
      </section>
      {!continent ? (
        <section id="population-instructions">
          <h1>
            Select a continent, then arrange the five displayed cities by
            population, from most populated (left) to least populated (right).
          </h1>
        </section>
      ) : (
        <section id="img-boxes">
        {cities.map((city, i) => {
          if (i >= 5) {return; 
          } else {
            return (
                <div key={city.cityName} className="img-name-box"><span className="number">{i +1}</span>
                  <img src={logo} alt="" className="img-box" />
                  {false ? <p className="city-name">{city.cityName}</p> :
                  <p className="city-name">{city.populationSize.toLocaleString()}</p>}
                </div>
            )
          }
        })}
         </section>
      )}
    </main>
  );
}

