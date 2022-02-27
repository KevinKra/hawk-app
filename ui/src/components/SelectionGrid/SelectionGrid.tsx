import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { $axios } from "../../utils/axios";
import { HawkData, StyledPaper } from "../UploadForm/UploadForm";

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
    <StyledPaper>
      {currentHawks.map((hawk) => {
        return <p>{hawk.colorDescription}</p>;
      })}
    </StyledPaper>
  );
};

export default SelectionGrid;
