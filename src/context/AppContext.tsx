import React, { createContext, useContext, useState, useRef } from "react";
import type { ReactNode } from "react";

import type { workerType } from "../../Types/Types";
import type { workerTotalType } from "../../Types/Types";
import type { cosechTotalType } from "../../Types/Types";
import type { Errors } from "../../Types/Types";

const workerInit: workerType = {
  worker: "",
  kilos: "",
  date: "",
  originalWorker: "",
};

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
  viewMode: "daily" | "summary";
  setViewMode: React.Dispatch<React.SetStateAction<"daily" | "summary">>;
  summary: workerTotalType[];
  setsummary: React.Dispatch<React.SetStateAction<workerTotalType[]>>;
  summaryCosesh: cosechTotalType[];
  setsummaryCosesh: React.Dispatch<React.SetStateAction<cosechTotalType[]>>;
  editTable: boolean;
  seteditTable: React.Dispatch<React.SetStateAction<boolean>>;
  workerUpdate: workerType[];
  setworkerUpdate: React.Dispatch<React.SetStateAction<workerType[]>>;
  filtered: workerType[];
  setfiltered: React.Dispatch<React.SetStateAction<workerType[]>>;
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
  worker: workerType;
  setworker: React.Dispatch<React.SetStateAction<workerType>>;
  shouldRefetch: boolean;
  setShouldRefetch: React.Dispatch<React.SetStateAction<boolean>>;
  tdRefs: React.RefObject<(HTMLTableCellElement | null)[]>;
  pricePerKilo: string;
  setPricePerKilo: React.Dispatch<React.SetStateAction<string>>;
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
  const [viewMode, setViewMode] = useState<"daily" | "summary">("daily");
  const [summary, setsummary] = useState<workerTotalType[]>([]);
  const [summaryCosesh, setsummaryCosesh] = useState<cosechTotalType[]>([]);
  const [editTable, seteditTable] = useState<boolean>(false);
  const [workerUpdate, setworkerUpdate] = useState<workerType[]>([]);
  const [filtered, setfiltered] = useState<workerType[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [pricePerKilo, setPricePerKilo] = useState<string>("");
  const [worker, setworker] = useState<workerType>(workerInit);
  const [shouldRefetch, setShouldRefetch] = useState(false);
  const tdRefs = useRef<(HTMLTableCellElement | null)[]>([]);
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
        viewMode,
        setViewMode,
        summary,
        setsummary,
        summaryCosesh,
        setsummaryCosesh,
        editTable,
        seteditTable,
        workerUpdate,
        setworkerUpdate,
        filtered,
        setfiltered,
        selectedDate,
        setSelectedDate,
        worker,
        setworker,
        shouldRefetch,
        setShouldRefetch,
        tdRefs,
        pricePerKilo,
        setPricePerKilo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
