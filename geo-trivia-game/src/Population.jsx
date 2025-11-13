import { useState, useEffect } from "react";

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
      south: -45,
      east: 155,
      west: -110,
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



  const getCityNames = async ({north, south, east, west}) => {
    try {
      const response = await fetch(
        `http://api.geonames.org/citiesJSON?north=${north}&south=${south}&east=${east}&west=${west}&lang=de&username=${apiKeyGEONAMES}`
      );
      const data = await response.json();
      const citiesArray = data.geonames.map((city) => city.toponymName)
      console.log(citiesArray)
      return setCities(citiesArray);
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
          <div className="img-name-box">1
            <img src="" alt="" className="img-box" />
            <p className="city-name">{cities[0]}</p>
          </div>
          <div className="img-name-box">2
            <img src="" alt="" className="img-box" />
            <p className="city-name">{cities[1]}</p>
          </div>
          <div className="img-name-box">3
            <img src="" alt="" className="img-box" />
            <p className="city-name">{cities[2]}</p>
          </div>
          <div className="img-name-box">4
            <img src="" alt="" className="img-box" />
            <p className="city-name">{cities[3]}</p>
          </div>
          <div className="img-name-box">5
            <img src="" alt="" className="img-box" />
            <p className="city-name">{cities[4]}</p>
          </div>
        </section>
      )}
    </main>
  );
}
