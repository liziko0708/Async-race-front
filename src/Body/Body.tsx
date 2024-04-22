import "../Body/Body.css";
import ResetIcon from "../assets/reset.svg";
import PlayIcon from "../assets/play.svg";
import Arrowsvg from "../assets/arrow.svg";
import Car from "../Car/car.tsx";
import { fetchCars, Car as CarType } from "../Services/carService.ts";
import { useRef, useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import { createCar } from "../Services/CreateCarService.ts";
import { updateCar } from "../Services/UpdateCarService.ts";
import { generateRandomCar } from "../Services/GenerateRandomCarService.ts";
import { ColorResult } from "react-color";

function Body() {
  const [currentColor, setCurrentColor] = useState("#DFFF00");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showPallete, setShowPallete] = useState(false);
  const [colorCurrent, setColorCurrent] = useState("#fff");
  const [carName, setCarName] = useState("");
  const [cars, setCars] = useState<CarType[]>([]);
  const carRefs = useRef<(CarRef | null)[]>([]);

  useEffect(() => {
    updateCarsList();
  }, []);

  const updateCarsList = async () => {
    const fetchedCars = await fetchCars();
    setCars(fetchedCars);
  };

  const handleCreateCar = async () => {
    try {
      await createCar({ name: carName, color: currentColor });
      updateCarsList();
    } catch (error) {
      console.error("Failed to create car:", error);
    }
  };

  const handleRemoveCar = (carId: number) => {
    setCars(cars.filter((car) => car.id !== carId));
  };

  const handleUpdateCar = async (
    carId: number,
    carData: { name: string; color: string }
  ) => {
    console.log("Updating car with ID:", carId);
    console.log("New car data:", carData);

    const car = cars.find((c) => c.id === carId);
    if (car && (car.name !== carData.name || car.color !== carData.color)) {
      try {
        await updateCar(carId, carData);
        updateCarsList();
      } catch (error) {
        console.error("Failed to update car:", error);
      }
    } else {
      console.log("No changes made to car name or color, skipping update.");
    }
  };

  const handleGenerateCar = async () => {
    try {
      const randomCar = generateRandomCar();
      await createCar(randomCar);
      updateCarsList();
    } catch (error) {
      console.error("Failed to generate car:", error);
    }
  };

  const handleOnChange = (color: ColorResult) => {
    setCurrentColor(color.hex);
  };

  const handleCangeColor = (color: ColorResult) => {
    setColorCurrent(color.hex);
  };

  const handleColorClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handlePalleteClick = () => {
    setShowPallete(!showPallete);
  };

  const handleRaceAllCars = async () => {
    try {
      // Trigger the race action for all cars simultaneously
      const racePromises = carRefs.current.map((carRef) =>
        carRef.handleRaceACar()
      );
      await Promise.all(racePromises);
    } catch (error) {
      console.error("Failed to start the race:", error);
    }
  };

  const numSVGs = Math.ceil(window.innerWidth / 100);
  const svgElements = Array.from({ length: numSVGs }, (_, i) => (
    <img
      key={i}
      src={Arrowsvg}
      alt="arrow svg"
      style={{ width: "30px", height: "30px" }}
    />
  ));

  return (
    <section className="body-buttons">
      <div className="all-buttons">
        <div className=" button race-start" onClick={handleRaceAllCars}>
          <p>RACE</p>
          <img className="icon" src={PlayIcon} alt="play icon" />
        </div>
        <div className=" button reset-button">
          <p>RESET</p>
          <img className="icon" src={ResetIcon} alt="reset icon" />
        </div>
        <div className=" create-car-name">
          <div className="input-color-container">
            <input
              type="text"
              placeholder="Enter car name"
              value={carName}
              onChange={(e) => setCarName(e.target.value)}
            />

            <div
              className="choosen-color"
              style={{ backgroundColor: currentColor }}
              onClick={handleColorClick}
            ></div>
            {showColorPicker && (
              <div className="color-pallete">
                <SketchPicker onChange={handleOnChange} color={currentColor} />
              </div>
            )}
          </div>

          <div onClick={handleCreateCar} className="button">
            <p>CREATE</p>
          </div>
        </div>
        <div className="update-car">
          <div className="input-color-container">
            <input type="text" placeholder="Update car name" />

            <div
              className="choosen-color"
              style={{ backgroundColor: colorCurrent }}
              onClick={handlePalleteClick}
            ></div>
            {showPallete && (
              <div className="color-pallete">
                <SketchPicker
                  onChange={handleCangeColor}
                  color={colorCurrent}
                />
              </div>
            )}
            <div className="button">UPDATE</div>
          </div>
        </div>
        <div className="generate-cars">
          <p className="button" onClick={handleGenerateCar}>
            GENERATE CARS
          </p>
        </div>
      </div>
      <div className="element-with-border"></div>
      <div className="arrows">
        <div className="neon-white-shadow ">{svgElements}</div>
      </div>
      <div className="element-with-border"></div>
      {cars.map((car, index) => (
        <Car
          key={index}
          car={{
            ...car,
            velocity: 0, // Provide default value for velocity
            distance: 0, // Provide default value for distance
          }}
          onRemove={handleRemoveCar}
          onUpdate={handleUpdateCar}
          ref={(ref) => (carRefs.current[index] = ref)}
        />
      ))}

      <div className="element-with-border"></div>
    </section>
  );
}

export default Body;
