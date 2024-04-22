interface Winner {
  id: number;
  wins: number;
  time: number;
}

const fetchWinnerById = async (id: number): Promise<Winner | null> => {
  try {
    const response = await fetch(`/winners/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch winner");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching winner:", error);
    return null;
  }
};

// Example usage
const winnerId = 1; // Replace with the desired winner ID
fetchWinnerById(winnerId)
  .then((winner) => {
    if (winner) {
      console.log("Winner:", winner);
    } else {
      console.log("Winner not found.");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
