import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./header/header";
import Body from "./Body/Body.tsx";
import Winners from "./Winners/Winners.tsx";

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
