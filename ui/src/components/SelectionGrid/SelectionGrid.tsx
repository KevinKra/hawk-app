import { Button, Paper, styled, Typography } from "@mui/material";
import React from "react";
import { useGetHawkContext } from "../../context";

// todo - resolve build/dev cors error
// todo - set current selection viewable from both components
// todo - configure sortable grid + buttons
// todo - adjust casing methods for column data
// todo - and more!

const SelectionGrid = () => {
  const hawks = useGetHawkContext();

  return (
    <StyledWrapper>
      <GridWrapper>
        <GridHeader>
          <Typography
            className="header-item"
            fontWeight={800}
            variant="subtitle1"
          >
            Name
          </Typography>
          <Typography
            className="header-item"
            fontWeight={800}
            variant="subtitle1"
          >
            Size
          </Typography>
          <Typography
            className="header-item"
            fontWeight={800}
            variant="subtitle1"
          >
            Gender
          </Typography>
        </GridHeader>
        {hawks.state.allHawks.map(({ id, name, size, gender }) => {
          return (
            <GridRow key={id}>
              <Typography>{name.toLowerCase()}</Typography>
              <Typography>{size.toLowerCase()}</Typography>
              <Typography>{gender.toLowerCase()}</Typography>
              <Button onClick={() => hawks.selectHawk(id)}>View</Button>
            </GridRow>
          );
        })}
      </GridWrapper>
    </StyledWrapper>
  );
};

export default SelectionGrid;

export const StyledWrapper = styled(Paper)`
  position: sticky;
  top: 1rem;
  border: 1px solid red;
  padding: 1rem;
  margin: 1rem;
  border: 1px solid #ddd;
  height: fit-content;
`;

const GridWrapper = styled("div")`
  display: grid;
  grid-template-rows: auto;

  .header-item {
    padding: 0.5rem 0;
  }

  div:nth-of-type(odd) {
    background-color: #ddd;
  }
  div:nth-of-type(1) {
    border-bottom: 1px solid #949494;
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

const GridHeader = styled(GridBase)`
  // ? feature style features here
`;

const GridRow = styled(GridBase)`
  // ? feature style features here
`;
