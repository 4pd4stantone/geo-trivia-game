import { useDraggable } from "@dnd-kit/core"
import logo from "./assets/geo-trivia-logo.png"

export default function CityCards({city}) {

    const {attributes, listeners, setNodeRef, transform } = useDraggable({
        id: city.cityName,
    })

    const style = transform ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`
    } : undefined;

 return (
    <>
        <div key={city.cityName} className="img-name-box" ref={setNodeRef} {...listeners} {...attributes} style={style}>
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