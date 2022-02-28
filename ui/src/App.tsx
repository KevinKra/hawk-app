import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import UploadForm from "./components/UploadForm/UploadForm";
import { $axios } from "./utils/axios";
import SelectionGrid from "./components/SelectionGrid/SelectionGrid";
import { HawkProvider } from "./context";
import styled from "@emotion/styled";

const App: React.FC = () => {
  return (
    <div className="App">
      <CssBaseline />
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <AppContent>
        <SelectionGrid />
        <UploadForm />
      </AppContent>
    </div>
  );
};

export default App;

const AppContent = styled("section")`
  position: relative;
  display: grid;
  grid-template-columns: 1fr minmax(450px, 600px);
  max-width: 85vw;
  margin: 0 auto;
`;
