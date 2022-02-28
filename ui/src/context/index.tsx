import React, { useEffect, useState } from "react";
import { HawkData } from "../components/UploadForm/UploadForm";
import { $axios } from "../utils/axios";

const HawkContext = React.createContext<
  | {
      state: { allHawks: HawkData[]; currentHawk: HawkData | undefined };
      selectHawk: any;
      resetHawk: any;
      incrementCounter: () => void;
    }
  | undefined
>(undefined);

function HawkProvider({ children }: any) {
  const [counter, setCounter] = useState(0);
  const [currentHawk, setCurrentHawk] = useState<HawkData>();
  const [allHawks, setAllHawks] = useState<HawkData[]>([]);

  useEffect(() => {
    const GetHawks = async () => {
      try {
        // ? troubleshoot solution attempt
        // const response = await fetch("http://localhost:8000/api/hawk/list", {
        //   method: "GET",
        //   headers: {
        //     Accept: "application/json",
        //     "Content-Type": "application/json;charset=UTF-8",
        //     "Access-Control-Allow-Origin": "*",
        //   },
        //   mode: "no-cors",
        // });
        const response = await $axios.get("/api/hawk/list");
        setAllHawks(response.data.hawks);
      } catch (error) {
        console.log({ error });
      }
    };
    GetHawks();
  }, [currentHawk, counter]);

  const selectCurrentHawk = (id: string) => {
    const selectedHawk = allHawks.find((hawk) => {
      return hawk.id === id;
    });
    setCurrentHawk(selectedHawk);
    return selectedHawk;
  };

  const resetCurrentHawk = () => {
    setCurrentHawk(undefined);
  };

  const incrementCounter = () => {
    // ? workaround - current database setup doesn't return data in response
    setCounter((counter) => counter + 1);
  };

  return (
    <HawkContext.Provider
      value={{
        state: { allHawks, currentHawk },
        selectHawk: selectCurrentHawk,
        resetHawk: resetCurrentHawk,
        incrementCounter,
      }}
    >
      {children}
    </HawkContext.Provider>
  );
}

function useGetHawkContext() {
  const context = React.useContext(HawkContext);
  if (context === undefined) {
    throw new Error("useGetHawkContext must be used within a HawkProvider");
  }
  return context;
}

export { HawkProvider, useGetHawkContext };
