interface UpdateCarData {
  name: string;
  color: string;
}

const updateCar = async (
  carId: number,
  carData: UpdateCarData
): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/garage/${carId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });

    if (!response.ok) {
      throw new Error("Failed to update car");
    }
  } catch (error) {
    console.error("Error updating car:", error);
    throw error;
  }
};

export { updateCar };
