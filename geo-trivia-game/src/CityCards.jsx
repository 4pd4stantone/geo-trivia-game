import logo from "./assets/geo-trivia-logo.png"

export default function CityCards({city}) {

 return (
    <>
        <div key={city.cityName} className="img-name-box">
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
    </>
    )

}