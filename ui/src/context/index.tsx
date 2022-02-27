import React, { useEffect, useState } from "react";
import { HawkData } from "../components/UploadForm/UploadForm";
import { $axios } from "../utils/axios";

const HawkContext = React.createContext<
  | {
      state: { allHawks: HawkData[]; currentHawk: HawkData | undefined };
      selectHawk: any;
    }
  | undefined
>(undefined);

function HawkProvider({ children }: any) {
  const [currentHawk, setCurrentHawk] = useState<HawkData>();
  const [allHawks, setAllHawks] = useState<HawkData[]>([]);

  useEffect(() => {
    const GetData = async () => {
      try {
        const response = await $axios.get(
          "http://localhost:8000/api/hawk/list"
        );
        // const response = await fetch("http://localhost:8000/api/hawk/list", {
        //   mode: "no-cors",
        // });
        setAllHawks(response.data.hawks);
        console.log({ response });
      } catch (error) {
        console.log({ error });
      }
    };
    GetData();
  }, []);

  const selectCurrentHawk = (id: string) => {
    const selectedHawk = allHawks.find((hawk) => {
      return hawk.id === id;
    });
    setCurrentHawk(selectedHawk);
    return selectedHawk;
  };

  return (
    <HawkContext.Provider
      value={{
        state: { allHawks, currentHawk },
        selectHawk: selectCurrentHawk,
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
