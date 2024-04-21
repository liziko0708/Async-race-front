import "../Body/Body.css";
import ResetIcon from "../assets/reset.svg";
import PlayIcon from "../assets/play.svg";
import Arrowsvg from "../assets/arrow.svg";
import Car from "../Car/car.tsx";
import { fetchCars, Car as CarType } from "../Services/carService.ts";

import { SketchPicker } from "react-color";
import { useState, useEffect } from "react";
import { raceAllCars } from "../Services/RaceCarsService.ts";
import { createCar } from "../Services/CreateCarService.ts";
import { updateCar } from "../Services/UpdateCarService.ts";
import { generateRandomCar } from "../Services/GenerateRandomCarService.ts";

function Body() {
  // Constants

  const [currentColor, setCurrentColor] = useState("#DFFF00");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showPallete, setShowPallete] = useState(false);
  const [colorCurrent, setColorCurrent] = useState("#fff");
  const [carName, setCarName] = useState("");
  const [cars, setCars] = useState<CarType[]>([]);

  //Functions

  useEffect(() => {
    updateCarsList(); // Initial fetch of cars
  }, []);
  const updateCarsList = async () => {
    const fetchedCars = await fetchCars();
    setCars(fetchedCars);
  };
  // Calculate the number of SVG elements needed to fill the viewport width
  const numSVGs = Math.ceil(window.innerWidth / 100);

  // Create an array to store SVG elements
  const svgElements = [];
  for (let i = 0; i < numSVGs; i++) {
    svgElements.push(
      <img
        key={i}
        src={Arrowsvg}
        alt="arrow svg"
        style={{ width: "30px", height: "30px" }}
      />
    );

    // function to Race all cars
    const handleRaceAllCars = async () => {
      try {
        await raceAllCars();
        console.log("All cars raced successfully");
        // Optionally, you can add UI feedback or update state upon success
      } catch (error) {
        console.error("Error racing cars:", error);
        // Optionally, you can handle errors or display error messages
      }
    };
    // Function to handle "Create" button click
    const handleCreateCar = async () => {
      try {
        // Send a POST request to create a new car
        await createCar({ name: carName, color: currentColor });
        updateCarsList();
        // or show a success message
      } catch (error) {
        // Handle errors, such as displaying an error message
        console.error("Failed to create car:", error);
      }
    };
    // Function to remove a car from the list
    const handleRemoveCar = (carId: number) => {
      setCars(cars.filter((car) => car.id !== carId));
    };
    const handleUpdateCar = async (
      carId: number,
      carData: { name: string; color: string }
    ) => {
      console.log("Updating car with ID:", carId);
      console.log("New car data:", carData);

      // Check if car name has changed
      const car = cars.find((c) => c.id === carId);
      if (car && car.name !== carData.name) {
        try {
          await updateCar(carId, carData);
          updateCarsList(); // Update the car list after updating
        } catch (error) {
          console.error("Failed to update car:", error);
        }
      } else {
        console.log("No changes made to car name, skipping update.");
      }
    };

    const handleGenerateCar = async () => {
      try {
        const randomCar = generateRandomCar(); // Generate a random car
        await createCar(randomCar); // Send a POST request to create the generated car
        updateCarsList(); // Update the list of cars
      } catch (error) {
        console.error("Failed to generate car:", error);
      }
    };

    const handleOnChange = (color) => {
      setCurrentColor(color.hex);
    };
    const handleCangeColor = (color) => {
      setColorCurrent(color.hex);
    };
    const handleColorClick = () => {
      if (showColorPicker == true) {
        setShowColorPicker(false);
      } else setShowColorPicker(true);
    };
    const handlePalleteClick = () => {
      if (showPallete == true) {
        setShowPallete(false);
      } else setShowPallete(true);
    };

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
                  <SketchPicker
                    onChange={handleOnChange}
                    color={currentColor}
                  />
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
          {/* Render the SVG elements */}
          <div className="neon-white-shadow ">
            {svgElements}
            {svgElements}
            {svgElements}
          </div>
        </div>
        <div className="element-with-border"></div>
        {/* Render the Car components with data fetched from the backend */}
        {cars.map((car, index) => (
          <Car
            key={index}
            car={car}
            onRemove={handleRemoveCar}
            onUpdate={handleUpdateCar}
          />
        ))}

        <div className="element-with-border"></div>
      </section>
    );
  }
}
export default Body;
