import styled from "@emotion/styled";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const UploadForm = () => {
  const [formData, setFormData] = useState({
    length: 0,
    wingspan: 0,
    weight: 0,
  });

  const handleInputChange = (e: any) => {
    // console.log(e.target.name, e.target.value);
    const target = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [target]: value });
  };

  return (
    <StyledPaper elevation={3}>
      <SelectionWrapper>
        <Typography className="selection-title">Name</Typography>
        <TextField
          fullWidth
          id="name"
          label="Name*"
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
      <StyledDivider />
      <SelectionWrapper>
        <Typography className="selection-title">{`Length (${formData.length}cm)`}</Typography>
        <Slider
          size="small"
          aria-label="length"
          name="length"
          value={formData.length}
          onChange={handleInputChange}
          valueLabelDisplay="auto"
          min={5}
          max={125}
        />
      </SelectionWrapper>
      <SelectionWrapper>
        <Typography className="selection-title">{`Wingspan (${formData.wingspan}cm)`}</Typography>
        <Slider
          size="small"
          aria-label="wingspan"
          name="wingspan"
          value={formData.wingspan}
          onChange={handleInputChange}
          valueLabelDisplay="auto"
          min={5}
          max={125}
        />
      </SelectionWrapper>
      <SelectionWrapper>
        <Typography className="selection-title">{`Weight (${formData.weight}g)`}</Typography>
        <Slider
          size="small"
          aria-label="weight"
          name="weight"
          value={formData.weight}
          onChange={handleInputChange}
          valueLabelDisplay="auto"
          min={5}
          max={250}
        />
      </SelectionWrapper>
      <StyledDivider />
      <SelectionWrapper>
        <Typography className="selection-title">Image</Typography>
        <TextField
          fullWidth
          id="name"
          label="Image*"
          placeholder="Some birdy"
          variant="outlined"
        />
      </SelectionWrapper>
      <SelectionWrapper vertical>
        <Typography className="selection-title">Color</Typography>
        <TextField
          fullWidth
          id="filled-multiline-flexible"
          label="Describe the hawk's color."
          multiline
          rows={3}
          //   value={value}
          //   onChange={handleChange}
          variant="filled"
        />
      </SelectionWrapper>
      <SelectionWrapper vertical>
        <Typography className="selection-title">Behavior</Typography>
        <TextField
          fullWidth
          id="filled-multiline-flexible"
          label="Describe the hawk's behavior."
          multiline
          rows={3}
          //   value={value}
          //   onChange={handleChange}
          variant="filled"
        />
      </SelectionWrapper>
      <SelectionWrapper vertical>
        <Typography className="selection-title">Habitat</Typography>
        <TextField
          fullWidth
          id="filled-multiline-flexible"
          label="Describe the hawk's habitat."
          multiline
          rows={3}
          //   value={value}
          //   onChange={handleChange}
          variant="filled"
        />
      </SelectionWrapper>
      <StyledButton variant="contained">Save</StyledButton>
    </StyledPaper>
  );
};

export default UploadForm;

const StyledPaper = styled(Paper)`
  display: grid;
  grid-gap: 1rem;
  padding: 1rem;
  margin: 1rem;
  width: 550px;
  border: 1px solid #ddd;
`;

const StyledDivider = styled(Divider)`
  margin-bottom: 0.5rem;
`;

const SelectionWrapper = styled("form")<{ vertical?: boolean }>`
  ${({ vertical }) =>
    vertical
      ? `display: grid;
    grid-row-gap: .25rem;`
      : `display: grid;
    grid-template-columns: 1.75fr 4fr;
    grid-column-gap: 1.25rem;
    place-items: center;`}

  .selection-title {
    justify-self: flex-start;
  }
`;

const StyledButton = styled(Button)`
  margin-top: 0.5rem;
  height: 3.5rem;
`;
