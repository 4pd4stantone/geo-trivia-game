import { useState, useEffect } from "react";
import logo from "./assets/geo-trivia-logo.png";
import largePop from "./assets/largePop.png"
import mediumPop from "./assets/mediumPop.png"
import smallPop from "./assets/smallPop.png"

export default function Population() {
  const [continent, setContinent] = useState(null);
  const [cities, setCities] = useState([]);
  const [game, setGame] = useState(false);

  // function handleDragEnd(event: DragEndEvent) {
  //   const { active, over } = event;

  //   if (!over) return;

  //   const taskId = active.ed 
  //   const newStatus = over.id 

  //   setTasks(() => tasks.map(task => task.ed === taskId ? {
  //           ...task,
  //           status: newStatus,
  //         }
  //         : task
  //       ),
  //     );
  // }

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
    const coords = coordinates[selected];
    getCityNames(coords);
    console.log(game);
    setGame(true);
  }
  console.log(game);

  function shuffleArray(citiesWithImg) {
    for (let i = citiesWithImg.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [citiesWithImg[i], citiesWithImg[j]] = [
        citiesWithImg[j],
        citiesWithImg[i],
      ];
    }
    return setCities(citiesWithImg);
  }

  const apiKeyGEONAMES = import.meta.env.VITE_GEONAMES_API_KEY;

  const getCityNames = async ({ north, south, east, west }) => {
    try {
      const response = await fetch(
        `http://api.geonames.org/citiesJSON?north=${north}&south=${south}&east=${east}&west=${west}&lang=de&username=${apiKeyGEONAMES}`
      );
      const data = await response.json();
      const citiesArray = data.geonames.map((city, i) => ({
        cityName: city.toponymName,
        populationSize: city.population,
      }));
      console.log(citiesArray);
      const citiesWithImg = await Promise.all(
        citiesArray.map(async (cityObject) => {
          const imgUrl = await getCityPics(cityObject.cityName);
          return { ...cityObject, imageUrl: imgUrl };
        })
      );
      return shuffleArray(citiesWithImg);
    } catch (e) {
      console.error(e);
    }
  };

  const apiKeyPIXABAY = import.meta.env.VITE_PIXABAY_API_KEY;

  const getCityPics = async (cityName) => {
    try {
      const response = await fetch(
        `https://pixabay.com/api/?key=${apiKeyPIXABAY}&category=places&q=${cityName}&image_type=photo&safesearch=true`
      );
      const data = await response.json();
      console.log(data);
      const index = Math.floor(Math.random() * 5)
      console.log(index)
      console.log(data?.hits[index]?.webformatURL);
      return data?.hits[index]?.webformatURL ?? null;
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    console.log(continent);
    console.log(cities);
  }, [continent, cities]);

  return (
    <main>
      <section id="continent-btns">
        <button
          name="northAmerica"
          className="continent-btn"
          onClick={handleContinent}
          disabled={game}
          style={game && ("northAmerica" === continent) ? {outline: "8px #417e82 solid", border: "5px"} : {}}
        >
          North America
        </button>
        <button
          name="southAmerica"
          className="continent-btn"
          onClick={handleContinent}
          disabled={game}
          style={game && ("southAmerica" === continent) ? {outline: "8px #417e82 solid", border: "5px"} : {}}
        >
          South America
        </button>
        <button
          name="europe"
          className="continent-btn"
          onClick={handleContinent}
          disabled={game}
          style={game && ("europe" === continent) ? {outline: "8px #417e82 solid", border: "5px"} : {}}
        >
          Europe
        </button>
        <button
          name="africa"
          className="continent-btn"
          onClick={handleContinent}
          disabled={game}
          style={game && ("africa" === continent) ? {outline: "8px #417e82 solid", border: "5px"} : {}}
        >
          Africa
        </button>
        <button 
        name="asia" 
        className="continent-btn" 
        onClick={handleContinent}
        disabled={game}
        style={game && ("asia" === continent) ? {outline: "8px #417e82 solid", border: "5px"} : {}}
        >
          Asia
        </button>
        <button
          name="australia"
          className="continent-btn"
          onClick={handleContinent}
          disabled={game}
          style={game && ("australia" === continent) ? {outline: "8px #417e82 solid", border: "5px"} : {}}
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
            if (i >= 5) {
              return;
            } else {
              return (
                <div key={city.cityName} className="img-name-box">
                  <span className="number">{i + 1}</span>
                  <img
                    src={city.imageUrl || logo}
                    alt=""
                    className="img-box"
                    style={city.imageUrl ? {} : { objectFit: "contain" }}
                  />
                  {true ? (
                    <p className="city-name">{city.cityName}</p>
                  ) : (
                    <p className="city-name">
                      {city.populationSize.toLocaleString()}
                    </p>
                  )}
                </div>
              );
            }
          })}
        </section>
      )}
      <section id="pop-img-section">
        <div>
          <img src={largePop} alt="Large Population" className="pop-img"/>
        </div>
        <div>
          <img src={mediumPop} alt="Medium Population" className="pop-img"/>
        </div>
        <div>
          <img src={smallPop} alt="Small Population" className="pop-img"/>
        </div>
      </section>
    </main>
  );
}
