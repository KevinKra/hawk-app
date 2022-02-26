import styled from "@emotion/styled";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const UploadForm = () => {
  return (
    <StyledPaper elevation={3}>
      <SelectionWrapper>
        <Typography className="selection-title">Name</Typography>
        <TextField
          fullWidth
          id="name"
          label="Required*"
          placeholder="Some birdy"
          variant="outlined"
        />
      </SelectionWrapper>
      <SelectionWrapper>
        <Typography className="selection-title">Size</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Size</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={10}
            label="Age"
            //   onChange={}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </SelectionWrapper>
      <SelectionWrapper>
        <Typography className="selection-title">Gender</Typography>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={"Male"}
            label="Gender"
            //   onChange={}
          >
            <MenuItem value={"Male"}>Male</MenuItem>
            <MenuItem value={"Female"}>Female</MenuItem>
          </Select>
        </FormControl>
      </SelectionWrapper>
    </StyledPaper>
  );
};

export default UploadForm;

const StyledPaper = styled(Paper)`
  display: grid;
  grid-gap: 1rem;
  padding: 1rem;
  margin: 1rem;
  width: 500px;
  border: 1px solid #ddd;
`;

const SelectionWrapper = styled("form")`
  /* border: 1px solid red; */
  display: grid;
  grid-template-columns: 1fr 4fr;
  place-items: center;

  .selection-title {
    justify-self: flex-start;
  }
`;
