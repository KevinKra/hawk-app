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

interface IUploadForm {
  name: string;
  size: "small" | "medium" | "large";
  gender: "male" | "female";
  length: number;
  wingspan: number;
  weight: number;
  image: string;
  color: string;
  behavior: string;
  habitat: string;
}

const UploadForm = () => {
  const [formData, setFormData] = useState<IUploadForm>({
    name: "",
    size: "small",
    gender: "male",
    length: 0,
    wingspan: 0,
    weight: 0,
    image: "",
    color: "",
    behavior: "",
    habitat: "",
  });

  const handleInputChange = (e: any) => {
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
          placeholder="Osprey"
          variant="outlined"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </SelectionWrapper>
      <SelectionWrapper>
        <Typography className="selection-title">Size</Typography>
        <FormControl fullWidth>
          <InputLabel id="hawk-size-label">Size</InputLabel>
          <Select
            labelId="hawk-size-label"
            id="hawk-size"
            value={formData.size}
            label="Size"
            name="size"
            onChange={handleInputChange}
          >
            <MenuItem value={"small"}>Small</MenuItem>
            <MenuItem value={"medium"}>Medium</MenuItem>
            <MenuItem value={"large"}>Large</MenuItem>
          </Select>
        </FormControl>
      </SelectionWrapper>
      <SelectionWrapper>
        <Typography className="selection-title">Gender</Typography>
        <FormControl fullWidth>
          <InputLabel id="hawk-gender-label">Gender</InputLabel>
          <Select
            labelId="hawk-gender-label"
            id="hawk-gender"
            value={formData.gender}
            label="Gender"
            name="gender"
            onChange={handleInputChange}
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
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
          name="image"
          value={formData.image}
          placeholder="link to image"
          onChange={handleInputChange}
          variant="outlined"
        />
      </SelectionWrapper>
      <SelectionWrapper vertical>
        <Typography className="selection-title">Color</Typography>
        <TextField
          fullWidth
          label="Describe the hawk's color."
          multiline
          rows={3}
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          variant="filled"
        />
      </SelectionWrapper>
      <SelectionWrapper vertical>
        <Typography className="selection-title">Behavior</Typography>
        <TextField
          fullWidth
          label="Describe the hawk's behavior."
          multiline
          rows={3}
          name="behavior"
          value={formData.behavior}
          onChange={handleInputChange}
          variant="filled"
        />
      </SelectionWrapper>
      <SelectionWrapper vertical>
        <Typography className="selection-title">Habitat</Typography>
        <TextField
          fullWidth
          label="Describe the hawk's habitat."
          multiline
          rows={3}
          name="habitat"
          value={formData.habitat}
          onChange={handleInputChange}
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
