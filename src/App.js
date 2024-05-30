import React, { useState } from "react";
import "./App.css";
import SetFeed from "./components/SetFeed/SetFeed";
import Feeds from "./components/Feeds/Feeds";

function App() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error is fetching Prducts:", error);
    }
  };

  return (
    <div className="App">
      <SetFeed />
      <Feeds />
    </div>
  );
}

export default App;
