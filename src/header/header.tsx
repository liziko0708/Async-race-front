import "./header.css";
import { Link } from "react-router-dom";
import lightningImage from "../assets/lightning-image.png";

function Header() {
  return (
    <>
      <section className="header">
        <div className="left-side">
          <div className="header-buttons">
            <div className="header-button">
              <h1 className="garage-button">GARAGE</h1>
            </div>
            <div className="header-button">
              <h1 className="winners-button">WINNERS</h1>
            </div>
          </div>
          <img
            className="fisrt-arrow Arrow"
            src={lightningImage}
            alt="lightning animation"
          />
        </div>
        <div className="right-side">
          <div className="circle">
            <h1>
              ASYNC <br></br>RACE
            </h1>
          </div>
          <img
            className="second-arrow Arrow"
            src={lightningImage}
            alt="lightning animation"
          />
        </div>
      </section>
    </>
  );
}
export default Header;
