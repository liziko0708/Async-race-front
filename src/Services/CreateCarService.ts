interface CarData {
  name: string;
  color: string;
}

const createCar = async (carData: CarData): Promise<void> => {
  try {
    const response = await fetch("http://localhost:3000/garage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      throw new Error("Failed to create car");
    }
  } catch (error) {
    console.error("Error creating car:", error);
    throw error;
  }
};

export { createCar };
