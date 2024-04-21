import React from "react";
import "./car.css";
import CarSvg from "./carSVG";
import { deleteCar } from "../Services/DelateCarService";
import { useState, useEffect } from "react";

interface CarProps {
  car: {
    name: string;
    color: string;
    id: number;
    velocity: number;
    distance: number;
  };
  onRemove: (carId: number) => void;
  onUpdate: (carId: number, carData: { name: string; color: string }) => void; // Ensure onUpdate is defined in the props
}

const Car: React.FC<CarProps> = ({ car, onRemove, onUpdate }) => {
  const [position, setPosition] = useState(0); // Initial position of the car
  useEffect(() => {
    // Calculate movement distance based on velocity and elapsed time
    const movementDistance = car.velocity * (5000 / car.distance); // Adjust time as needed

    // Update position of the car
    const interval = setInterval(() => {
      setPosition((prevPosition) => prevPosition + movementDistance);
    }, 1000); // Adjust interval as needed

    // Cleanup function
    return () => clearInterval(interval);
  }, [car.velocity, car.distance]);
  const handleRemoveClick = async () => {
    try {
      await deleteCar(car.id); // Call the deleteCar service function
      onRemove(car.id); // Call the parent component's function to update the car list
    } catch (error) {
      console.error("Failed to remove car:", error);
    }
  };

  const handleSelectClick = () => {
    // Trigger the onUpdate function with the car's ID and current data
    console.log("SELECT button clicked");
    onUpdate(car.id, { name: car.name, color: car.color });
  };

  return (
    <div className="road">
      <div className="car-buttons">
        <div className="selectAndRemove">
          <div onClick={handleSelectClick}>SELECT</div>
          <div onClick={handleRemoveClick}>REMOVE</div>
        </div>
        <div className="startPause">
          <div>A</div>
          <div>B</div>
        </div>
        {/* Render car SVG with dynamic color */}
        <div style={{ left: `${position}px`, fill: car.color }} className="car">
          <CarSvg />
        </div>
        {/* Display car name */}
        <div className="car-name" style={{ color: car.color }}>
          {car.name}
        </div>
      </div>
    </div>
  );
};

export default Car;
