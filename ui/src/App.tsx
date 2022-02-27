import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import UploadForm from "./components/UploadForm/UploadForm";
import { $axios } from "./utils/axios";
import SelectionGrid from "./components/SelectionGrid/SelectionGrid";

const App: React.FC = () => {
  return (
    <div className="App">
      <CssBaseline />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />

      <SelectionGrid />
      <UploadForm />
    </div>
  );
};

export default App;

// const StyledBox = styled("div")<{ primary?: boolean }>`
//   border: 1px solid red;
//   color: ${({ primary }) => (primary ? "red" : "blue")};
// `;
