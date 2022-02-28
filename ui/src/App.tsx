import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import UploadForm from "./components/UploadForm/UploadForm";
import SelectionGrid from "./components/SelectionGrid/SelectionGrid";
import styled from "@emotion/styled";

const App: React.FC = () => {
  return (
    <div>
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
