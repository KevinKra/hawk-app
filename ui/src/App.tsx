import React, { useEffect } from "react";
import axios from "axios";
import "./App.css";

const App: React.FC = () => {
  useEffect(() => {
    const checkAPI = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/hawk/list");
        console.log({ response });
      } catch (error) {
        console.log({ error });
      }
    };
    checkAPI();
  }, []);

  return (
    <div className="App">
      <h1>hello world</h1>
    </div>
  );
};

export default App;
