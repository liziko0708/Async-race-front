export interface Car {
  id: number;
  name: string;
  color: string;
}

export async function fetchCars(): Promise<Car[]> {
  try {
    const response = await fetch("http://localhost:3000/garage");

    if (!response.ok) {
      throw new Error("Failed to fetch cars");
    }
    const data: Car[] = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    return [];
  }
}
