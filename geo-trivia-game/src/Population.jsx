import { useState, useEffect } from "react";
import { DndContext } from "@dnd-kit/core";
import { useDroppable } from "@dnd-kit/core"
import CityCards from "./CityCards.jsx";
import coordinates from "./coordinates.js";
import arrow from "./assets/arrow.png";
import xlargePop from "./assets/xlargePop.png"
import smallPop from "./assets/smallPop.png"
import Columns from "./Columns.jsx";
import columnsArray from "./columnsArray.js";

export default function Population() {
  const [continent, setContinent] = useState(null);
  const [cities, setCities] = useState([]);
  const [game, setGame] = useState(false);
  const [status, setStatus] = useState(null);

 

  // function to check correct order of population, from largest to smallest every time the drag and drop function is done.
  function checkPopulation(cities) {
    
    const sortedPop = [...cities].toSorted((a, b) => b.populationSize - a.populationSize);
    console.log(sortedPop)

    const citiesUpdated = cities.map(city => {
     const correctCityIndex = sortedPop[city.status -1]

     const isCorrectOrder = city.populationSize === correctCityIndex.populationSize

     return {
      ...city,
      correctOrder: isCorrectOrder
     }
    })
    setCities(citiesUpdated);
    allTrue(citiesUpdated)
}
  // taking the cities correctOrder through a test to see if its value is true, if all the values are true it will return true as a whole
  function allTrue(citiesUpdated) {
    const cityCorrectOrder = citiesUpdated.every(city => city.correctOrder === true)
    console.log('It is ' + cityCorrectOrder + " that you won")
    
  }

  function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id 
    const targetColumn = over.id 

    setCities(prev => {
      const draggedCard = prev.find(city => city.cityName === activeId);
      const cardInTarget = prev.find(city => city.status === targetColumn);
      
      const updatedCities = prev.map(city => {
        if(city.cityName === activeId) {
          return {...city, status: targetColumn}
        }
        if (city.cityName === cardInTarget.cityName) {
          return {...city, status: draggedCard.status}
        }
        return city
      })
    checkPopulation(updatedCities)
    return updatedCities
    })
 
  }


  function assignStatus(citiesWithImg) {
    const firstFive = citiesWithImg.slice(0,5)
    const citiesWithStatus = firstFive.map((card, i) => ({...card, status: i + 1, correctOrder: null})  )
    console.log(citiesWithStatus)
    return setCities(citiesWithStatus)
}

function shuffleArray(citiesWithImg) {
    for (let i = citiesWithImg.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [citiesWithImg[i], citiesWithImg[j]] = [
        citiesWithImg[j],
        citiesWithImg[i],
      ];
    }
    return assignStatus(citiesWithImg);
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
          <DndContext onDragEnd={handleDragEnd}>
          {columnsArray.map((column) => {
            const cityCardPerColumn = cities.find(
              (cityCard) => cityCard.status === column.id)

            return (
              <Columns column={column} key={column.id} >
                {cityCardPerColumn && <CityCards city={cityCardPerColumn} />}
              </Columns> 
            )
          })}
          </DndContext>
        </section>
      )}
      {game ?
      ( <section id="pop-img-section">
          <div id="left-pop-img">
            <img src={xlargePop} alt="Large Population" />
          </div>
          <div id="arrow-img">
            <img src={arrow} alt="arrow" />
          </div>
          <div id="right-pop-img">
            <img src={smallPop} alt="Small Population"/>
          </div>
      </section>)
      : 
      ("")
      }
    </main>
  );
}
