import React, { forwardRef, useImperativeHandle } from "react";
import "./car.css";
import CarSvg from "./carSVG";
import { deleteCar } from "../Services/DelateCarService";
import { raceACar } from "../Services/RaceACar";
import { useState } from "react";

interface CarProps {
  car: {
    name: string;
    color: string;
    id: number;
    velocity: number;
    distance: number;
  };
  onRemove: (carId: number) => void;
  onUpdate: (carId: number, carData: { name: string; color: string }) => void;
}

export interface CarRef {
  handleRaceACar: () => Promise<void>;
}

const Car: React.ForwardRefRenderFunction<CarRef, CarProps> = (
  { car, onRemove, onUpdate },
  ref
) => {
  const [speed, setSpeed] = useState(0);

  const handleRemoveClick = async () => {
    try {
      await deleteCar(car.id);
      onRemove(car.id);
    } catch (error) {
      console.error("Failed to remove car:", error);
    }
  };

  const handleSelectClick = () => {
    onUpdate(car.id, { name: car.name, color: car.color });
  };

  interface RaceResponse {
    success: boolean;
    distance: number;
    velocity: number;
    // Add any other properties if present in the response object
  }

  const handleRaceACar = async () => {
    try {
      const startResponse: RaceResponse = await raceACar(car.id, "started");

      const driveResponse: RaceResponse = await raceACar(car.id, "drive");

      if (driveResponse.success === true) {
        const duration = startResponse.distance / startResponse.velocity;
        setSpeed(duration);
        console.log(duration);
      }
    } catch (error) {
      console.error("Failed to start a car:", error);
    }
  };

  const handleStopCar = () => {
    setSpeed(0);
  };

  // Expose method through ref
  useImperativeHandle(ref, () => ({
    handleRaceACar: handleRaceACar,
  }));

  return (
    <div className="car-section">
      <div className="road">
        <div className="car-buttons">
          <div className="selectAndRemove">
            <div onClick={handleSelectClick}>SELECT</div>
            <div onClick={handleRemoveClick}>REMOVE</div>
          </div>
          <div className="startPause">
            <div onClick={handleRaceACar}>A</div>
            <div onClick={handleStopCar}>B</div>
          </div>
        </div>
        <div className="car-and-name">
          <div
            style={{
              fill: car.color,
              animation: speed
                ? `moveBox ${speed}ms ease-in-out forwards`
                : "none",
            }}
            className={`${speed && "driving"} car`}
          >
            <CarSvg />
          </div>
          <div className={"car-name"} style={{ color: car.color }}>
            {car.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Car);
