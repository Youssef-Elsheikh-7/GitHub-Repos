import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
import "../Style/Loader.scss";

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);
function Loader() {
  return (
    <div className="loader">
      <lord-icon
        src="https://cdn.lordicon.com/ymrqtsej.json"
        trigger="loop"
        colors="primary:#121331"
        style={{ width: "250px", height: "250px" }}
      ></lord-icon>
    </div>
  );
}

export default Loader;
