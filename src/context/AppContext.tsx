import React, { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

import type { workerType } from "../../Types/Types";
import type { Errors } from "../../Types/Types";

type AppContextType = {
  recordWorker: workerType[];
  setrecordWorker: React.Dispatch<React.SetStateAction<workerType[]>>;
  showpricePerKilo: boolean;
  setshowpricePerKilo: React.Dispatch<React.SetStateAction<boolean>>;
  kilosPrecio: string;
  setKilosPrecio: React.Dispatch<React.SetStateAction<string>>;
  savePrecie: boolean;
  setsavePrecie: React.Dispatch<React.SetStateAction<boolean>>;
  errors: Errors;
  setErrors: React.Dispatch<React.SetStateAction<Errors>>;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [recordWorker, setrecordWorker] = useState<workerType[]>([]);
  const [showpricePerKilo, setshowpricePerKilo] = useState<boolean>(true);
  const [kilosPrecio, setKilosPrecio] = useState<string>("");
  const [savePrecie, setsavePrecie] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({
    precieKg: "",
    worker: "",
    kilos: "",
    workerExist: "",
  });

  return (
    <AppContext.Provider
      value={{
        recordWorker,
        setrecordWorker,
        showpricePerKilo,
        setshowpricePerKilo,
        kilosPrecio,
        setKilosPrecio,
        savePrecie,
        setsavePrecie,
        errors,
        setErrors,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
