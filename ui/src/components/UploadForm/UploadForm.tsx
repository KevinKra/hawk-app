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
import axios from "axios";
import React, { useState } from "react";
import { useGetHawkContext } from "../../context";
import { StyledWrapper } from "../SelectionGrid/SelectionGrid";

interface IHawkFormData {
  name: string;
  size: "SMALL" | "MEDIUM" | "LARGE";
  gender: "MALE" | "FEMALE";
  length: number[];
  wingspan: number[];
  weight: number[];
  pictureUrl: string;
  colorDescription: string;
  behaviorDescription: string;
  habitatDescription: string;
}

export type HawkData = Omit<IHawkFormData, "length" | "wingspan" | "weight"> & {
  id?: string;
  lengthBegin: number;
  lengthEnd: number;
  wingspanBegin: number;
  wingspanEnd: number;
  weightEnd: number;
  weightBegin: number;
};

const UploadForm = () => {
  const hawks = useGetHawkContext();

  console.log("h", hawks.state.currentHawk);

  const [formData, setFormData] = useState<IHawkFormData>({
    name: "",
    size: "SMALL",
    gender: "MALE",
    length: [0, 25],
    wingspan: [0, 25],
    weight: [0, 25],
    pictureUrl: "",
    colorDescription: "",
    behaviorDescription: "",
    habitatDescription: "",
  });

  const handleInputChange = (e: any) => {
    const target = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [target]: value });
  };

  const {
    name,
    size,
    gender,
    pictureUrl,
    colorDescription,
    behaviorDescription,
    habitatDescription,
  } = formData;

  const cleanedFormData: HawkData = {
    name,
    size,
    gender,
    pictureUrl,
    colorDescription,
    behaviorDescription,
    habitatDescription,
    lengthBegin: formData.length[0],
    lengthEnd: formData.length[1],
    wingspanBegin: formData.wingspan[0],
    wingspanEnd: formData.wingspan[1],
    weightBegin: formData.weight[0],
    weightEnd: formData.weight[1],
  };

  // todo - choose a working solution, at least let it work on dev.
  const handleUpload = async () => {
    try {
      //   const response = await $axios.post("/api/hawk", cleanedFormData);
      //   //   const response = await axios.post(
      //   //     "http://localhost:8000/api/hawk",
      //   //     cleanedFormData
      //   //   );
      const response = await fetch("http://localhost:8000/api/hawk", {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain",
          "Content-Type": "application/json;charset=UTF-8",
        },
        // mode: "no-cors", // todo - cannot no-cors on post?
        body: JSON.stringify(cleanedFormData),
      });

      console.log({ response });
    } catch (error) {
      console.log({ error });
    }
  };

  // ? although I destructured the formData object above; I have a personal preference for using attributes
  // ? for more readability when possible (like below).
  return (
    <StyledWrapper elevation={3}>
      <FormContents>
        <SelectionWrapper>
          <Typography className="selection-title" fontWeight={500}>
            Name
          </Typography>
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
          <Typography className="selection-title" fontWeight={500}>
            Size
          </Typography>
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
              <MenuItem value={"SMALL"}>Small</MenuItem>
              <MenuItem value={"MEDIUM"}>Medium</MenuItem>
              <MenuItem value={"LARGE"}>Large</MenuItem>
            </Select>
          </FormControl>
        </SelectionWrapper>
        <SelectionWrapper>
          <Typography className="selection-title" fontWeight={500}>
            Gender
          </Typography>
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
              <MenuItem value={"MALE"}>Male</MenuItem>
              <MenuItem value={"FEMALE"}>Female</MenuItem>
            </Select>
          </FormControl>
        </SelectionWrapper>
        <StyledDivider />
        <SelectionWrapper>
          <div className="selection-title">
            <Typography fontWeight={500}>{`Length`}</Typography>
            <Typography variant="overline">{`${formData.length[0]} - ${formData.length[1]} cm`}</Typography>
          </div>
          <Slider
            size="small"
            getAriaLabel={() => "length"}
            name="length"
            value={formData.length}
            onChange={handleInputChange}
            valueLabelDisplay="auto"
            min={5}
            max={125}
          />
        </SelectionWrapper>
        <SelectionWrapper>
          <div className="selection-title">
            <Typography fontWeight={500}>{`Wingspan`}</Typography>
            <Typography variant="overline">{`${formData.wingspan[0]} - ${formData.wingspan[1]} cm`}</Typography>
          </div>
          <Slider
            size="small"
            getAriaLabel={() => "wingspan"}
            name="wingspan"
            value={formData.wingspan}
            onChange={handleInputChange}
            valueLabelDisplay="auto"
            min={5}
            max={125}
          />
        </SelectionWrapper>
        <SelectionWrapper>
          <div className="selection-title">
            <Typography fontWeight={500}>{`Weight`}</Typography>
            <Typography variant="overline">{`${formData.weight[0]} - ${formData.weight[1]} grams`}</Typography>
          </div>
          <Slider
            size="small"
            getAriaLabel={() => "weight"}
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
          <Typography className="selection-title" fontWeight={500}>
            Image
          </Typography>
          <TextField
            fullWidth
            id="name"
            label="Image*"
            name="pictureUrl"
            value={formData.pictureUrl}
            placeholder="link to image"
            onChange={handleInputChange}
            variant="outlined"
          />
        </SelectionWrapper>
        <SelectionWrapper vertical>
          <Typography className="selection-title" fontWeight={500}>
            Color
          </Typography>
          <TextField
            fullWidth
            label="Describe the hawk's color."
            multiline
            rows={3}
            name="colorDescription"
            value={formData.colorDescription}
            onChange={handleInputChange}
            variant="filled"
          />
        </SelectionWrapper>
        <SelectionWrapper vertical>
          <Typography className="selection-title" fontWeight={500}>
            Behavior
          </Typography>
          <TextField
            fullWidth
            label="Describe the hawk's behavior."
            multiline
            rows={3}
            name="behaviorDescription"
            value={formData.behaviorDescription}
            onChange={handleInputChange}
            variant="filled"
          />
        </SelectionWrapper>
        <SelectionWrapper vertical>
          <Typography className="selection-title" fontWeight={500}>
            Habitat
          </Typography>
          <TextField
            fullWidth
            label="Describe the hawk's habitat."
            multiline
            rows={3}
            name="habitatDescription"
            value={formData.habitatDescription}
            onChange={handleInputChange}
            variant="filled"
          />
        </SelectionWrapper>
        <StyledButton onClick={handleUpload} variant="contained">
          Save
        </StyledButton>
      </FormContents>
    </StyledWrapper>
  );
};

export default UploadForm;

export const FormContents = styled("div")`
  display: grid;
  grid-gap: 1rem;
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
