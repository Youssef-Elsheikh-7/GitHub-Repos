import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./Components/Loader";
import ReposDetails from "./Components/ReposDetails";
import Footer from "./Components/Footer";
function App() {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 1000);
  }, []);
  return (
    <div className="App">
      {(() => {
        if (!loader) {
          return <Loader />;
        } else {
          return (
            <>
              <ReposDetails />
              <Footer />
            </>
          );
        }
      })()}
    </div>
  );
}

export default App;
