import styled from "@emotion/styled";
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useGetHawkContext } from "../../context";
import { IHawkFormData, HawkData } from "../../types";
import { fetchHandler } from "../../utils";
import { StyledWrapper } from "../SelectionGrid/SelectionGrid";

const defaultFormState: IHawkFormData = {
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
};

const UploadForm = () => {
  const [updateMode, setUpdateMode] = useState(false);
  const [formError, setFormError] = useState(false);
  const [formData, setFormData] = useState<IHawkFormData>(defaultFormState);
  const {
    state: { currentHawk: currSelectedHawk },
    resetHawk,
    incrementCounter,
  } = useGetHawkContext();

  useEffect(() => {
    if (currSelectedHawk) {
      setUpdateMode(true);
      const {
        name,
        size,
        gender,
        pictureUrl,
        colorDescription,
        behaviorDescription,
        habitatDescription,
      } = currSelectedHawk;
      setFormData({
        name,
        size,
        gender,
        pictureUrl,
        colorDescription,
        behaviorDescription,
        habitatDescription,
        length: [currSelectedHawk.lengthBegin, currSelectedHawk.lengthEnd],
        wingspan: [
          currSelectedHawk.wingspanBegin,
          currSelectedHawk.wingspanEnd,
        ],
        weight: [currSelectedHawk.weightBegin, currSelectedHawk.weightEnd],
      });
    }
  }, [currSelectedHawk]);

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

  const resetForm = () => {
    setFormData(defaultFormState);
    resetHawk();
  };

  const checkForMissingInputs = () => {
    // ? func handles _only_ input checking behavior
    const formValues = Object.values(formData);
    const foundEmptyInputs = formValues.some((value) => value === "");
    if (foundEmptyInputs) {
      setFormError(true);
      return true;
    }
    setFormError(false);
    return false;
  };

  // * form handlers
  const handlePost = async () => {
    const foundMissingInputs = checkForMissingInputs();
    if (foundMissingInputs === false) {
      await fetchHandler("api/hawk", "POST", cleanedFormData);
      incrementCounter();
      resetForm();
    }
    // todo - set warning
  };

  const handleUpdate = async (id: string) => {
    const foundMissingInputs = checkForMissingInputs();
    if (foundMissingInputs === false) {
      fetchHandler(`api/hawk/${id}`, "PUT", cleanedFormData);
      resetForm();
      setUpdateMode(false);
    }
  };

  const handleDelete = async (id: string) => {
    fetchHandler(`api/hawk/${id}`, "DELETE", cleanedFormData);
    resetForm();
    setUpdateMode(false);
  };

  // ? although I destructured the formData object above;
  // ? I have a personal preference for using dot notation
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
            inputProps={{ maxLength: 18 }}
            id="name"
            label="Name*"
            placeholder="Osprey"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            error={formError && !formData.name}
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
              error={formError && !formData.size}
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
              error={formError && !formData.gender}
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
            error={formError && !formData.pictureUrl}
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
            error={formError && !formData.colorDescription}
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
            error={formError && !formData.behaviorDescription}
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
            error={formError && !formData.habitatDescription}
          />
        </SelectionWrapper>
        {updateMode ? (
          <ButtonBar>
            <StyledButton
              onClick={() => handleDelete(currSelectedHawk?.id as string)}
              color="error"
              variant="outlined"
            >
              Delete
            </StyledButton>
            <StyledButton
              onClick={() => handleUpdate(currSelectedHawk?.id as string)}
              color="primary"
              variant="contained"
            >
              Update
            </StyledButton>
          </ButtonBar>
        ) : (
          <StyledButton onClick={handlePost} variant="contained">
            Save
          </StyledButton>
        )}
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

const ButtonBar = styled("div")`
  display: grid;
  grid-template-columns: 1.25fr 3fr;
  grid-column-gap: 1rem;
`;

const StyledButton = styled(Button)`
  margin-top: 0.5rem;
  height: 3.5rem;
`;
