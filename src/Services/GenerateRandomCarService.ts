interface RandomCar {
  name: string;
  color: string;
}

const generateRandomCar = (): RandomCar => {
  // Sample names and colors for demonstration
  const names = ["Tesla", "Toyota", "Ford", "Honda", "BMW"];
  const colors = ["#FF5733", "#33FF57", "#5733FF", "#33FFFF", "#FFFF33"];

  // Generate random index for names and colors arrays
  const randomNameIndex = Math.floor(Math.random() * names.length);
  const randomColorIndex = Math.floor(Math.random() * colors.length);

  // Return a random car object
  return {
    name: names[randomNameIndex],
    color: colors[randomColorIndex],
  };
};

export { generateRandomCar };
