import "./App.css";

import Header from "./header/header";
import Body from "./Body/Body.tsx";

function App() {
  return (
    <div className="container">
      <Header />
      <Body />
      {/* Route for the garage page */}
    </div>
  );
}

export default App;
