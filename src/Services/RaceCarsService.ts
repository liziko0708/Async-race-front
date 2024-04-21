const raceAllCars = async (
  carId: number,
  status: "started" | "stopped"
): Promise<void> => {
  try {
    const response = await fetch(
      `http://localhost:3000/engine/?id=${carId}&status=${status}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to start or stop the engine");
    }
    // Optionally, you can handle success cases or return data if needed
  } catch (error) {
    console.error("Error starting or stopping engine:", error);
    throw error;
  }
};

export { raceAllCars };
