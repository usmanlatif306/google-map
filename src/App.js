import { useState, useEffect } from "react";
import "./App.css";
import GoogleMap from "./components/GoogleMap";
import Loading from "./components/Loading/Loading";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setInterval(() => {
      setIsLoading(false);
    }, 5200);
  }, []);
  return (
    // <GoogleMap />
    <div className="App">{isLoading ? <Loading /> : <GoogleMap />}</div>
  );
}

export default App;
