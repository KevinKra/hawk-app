import React, { useEffect } from "react";
import axios from "axios";
import { Typography } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import styled from "@emotion/styled";
import UploadForm from "./components/UploadForm/UploadForm";

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
      <CssBaseline />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      {/* <StyledBox> */}
      <UploadForm />
      {/* </StyledBox> */}
    </div>
  );
};

export default App;

// const StyledBox = styled("div")<{ primary?: boolean }>`
//   border: 1px solid red;
//   color: ${({ primary }) => (primary ? "red" : "blue")};
// `;
