import { Button, Paper, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { $axios } from "../../utils/axios";
import { HawkData } from "../UploadForm/UploadForm";

const SelectionGrid = () => {
  const [currentHawks, setCurrentHawks] = useState<HawkData[]>([]);

  useEffect(() => {
    const checkAPI = async () => {
      try {
        const response = await $axios.get(
          "http://localhost:8000/api/hawk/list"
        );
        // const response = await fetch("http://localhost:8000/api/hawk/list", {
        //   mode: "no-cors",
        // });
        setCurrentHawks(response.data.hawks);
        console.log({ response });
      } catch (error) {
        console.log({ error });
      }
    };
    checkAPI();
  }, []);

  return (
    <StyledWrapper>
      <GridWrapper>
        <GridHeader>
          <Typography>Name</Typography>
          <Typography>Size</Typography>
          <Typography>Gender</Typography>
        </GridHeader>
        {currentHawks.map(({ name, size, gender }) => {
          return (
            <GridRow>
              <Typography>{name.toLowerCase()}</Typography>
              <Typography>{size.toLowerCase()}</Typography>
              <Typography>{gender.toLowerCase()}</Typography>
              <Button>View</Button>
            </GridRow>
          );
        })}
      </GridWrapper>
    </StyledWrapper>
  );
};

export default SelectionGrid;

export const StyledWrapper = styled(Paper)`
  border: 1px solid red;
  padding: 1rem;
  margin: 1rem;
  width: 550px;
  border: 1px solid #ddd;
`;

const GridWrapper = styled("div")`
  display: grid;
  grid-template-rows: auto;

  div:nth-child(odd) {
    background-color: #ddd;
  }
  div:nth-child(0) {
    background-color: none;
  }
`;

const GridBase = styled("div")`
  // ? parent grid placement
  grid-column: 1 / 5;

  // ? local grid
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  grid-gap: 0.5rem;
`;

const GridHeader = styled(GridBase)``;

const GridRow = styled(GridBase)``;
