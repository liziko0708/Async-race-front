const deleteCar = async (carId: number): Promise<void> => {
  try {
    const response = await fetch(`http://localhost:3000/garage/${carId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the car");
    }
  } catch (error) {
    console.error("Error deleting car:", error);
    throw error;
  }
};

export { deleteCar };
