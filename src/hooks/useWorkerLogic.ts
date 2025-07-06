// src/utils/useWorkerLogic.ts
import { useApp } from "../context/AppContext";
import type { workerType } from "../../Types/Types";


export const useWorkerLogic = () => {
  const {
    workerUpdate,
    setworkerUpdate,
    recordWorker,
    setrecordWorker,
    selectedDate,
    kilosPrecio,
    setsummary,
    setsummaryCosesh,
    setViewMode,
    worker,
    setworker
  } = useApp();

  // Copia de trabajadores actualizada
 const workerupdate = async (index: number, prop: string, value: string) => {
  const updatedItem = { ...workerUpdate[index] };
  updatedItem[prop as keyof workerType] = value;

  const updatedList = [...workerUpdate];
  updatedList[index] = updatedItem;
  setworkerUpdate(updatedList);

};

  // Actualiza y guarda trabajadores en estado global
  const handleGuardar = () => {
    const updatedGlobal = [...recordWorker];

    workerUpdate.forEach((updatedItem) => {
      const indexInGlobal = updatedGlobal.findIndex(
        (item) =>
          item.date === selectedDate &&
          item.worker === updatedItem.originalWorker
      );

      if (indexInGlobal !== -1) {
        updatedGlobal[indexInGlobal] = updatedItem;
      }
    });

    setrecordWorker(updatedGlobal);
  };


  //Suma de Total trabajdor + Suma total de semana
  const handleTotalClick = () => {
    const resumen = recordWorker.reduce((acc, r) => {
      const { worker, kilos } = r;
      const kilosInt = parseInt(kilos);
      if (!acc[worker]) {
        acc[worker] = {
          worker,
          totalKilos: 0,
          totalDinero: 0,
        };
      }
      acc[worker].totalKilos += kilosInt;
      acc[worker].totalDinero += kilosInt * parseInt(kilosPrecio);
      return acc;
    }, {} as Record<string, { worker: string; totalKilos: number; totalDinero: number }>);

    setsummary(Object.values(resumen));

    const suma = Object.values(resumen).reduce(
      (acc, summary) => {
        acc.totalKilos += summary.totalKilos;
        acc.totalDinero += summary.totalDinero;
        return acc;
      },
      {
        worker: "",
        totalDinero: 0,
        totalKilos: 0,
      }
    );
    setsummaryCosesh([suma]);
    setViewMode("summary");
  };


  //Día Seleccionado
  const selectedDayName = selectedDate
      ? (() => {
          const [year, month, day] = selectedDate.split("-").map(Number);
          const dateObj = new Date(year, month - 1, day);
          return dateObj.toLocaleDateString("es-ES", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          });
        })()
      : "";


//Guardar trabajdor dentro de estado worker 
const Recordsworkers = (name: string, value: string) => {
    setworker({
      ...worker,
      [name]: value,
    });
  };


  return { workerupdate, handleGuardar, handleTotalClick ,selectedDayName,Recordsworkers};
};
