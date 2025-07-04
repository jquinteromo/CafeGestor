import { useWorkerLogic } from "../hooks/useWorkerLogic";
import { useApp } from "../context/AppContext";
import { useEffect } from "react";

import type { workerType } from "../../Types/Types";
import type { Errors } from "../../Types/Types";

const workerInit: workerType = {
  worker: "",
  kilos: "",
  date: "",
};

const errorsInit: Errors = {
  precieKg: "",
  worker: "",
  kilos: "",
  workerExist: "",
};

export const HarvestForm = () => {
  const {
    worker,
    setworker,
    recordWorker,
    setrecordWorker,
    kilosPrecio,
    savePrecie,
    errors,
    setErrors,
  } = useApp();

    const { Recordsworkers} = useWorkerLogic();

  const dataWorker = (value: workerType) => {
    setrecordWorker((prev) => [...prev, value]);
  };



  const getLocalDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const alreadyExists = recordWorker.some(
    (r) =>
      r.worker.toLowerCase().trim() === worker.worker.toLowerCase().trim() &&
      r.date === getLocalDate()
  );

  
  useEffect(() => {
    console.log(recordWorker);
  }, [recordWorker]);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 flex flex-col ">
      <h2 className="text-xl  font-semibold text-green-800 mb-8">
        Registro de Trabajador
      </h2>
      <div className="space-y-3 flex flex-col gap-10">
        <div className="flex flex-col">
          <label className="text-start text-base font-semibold text-gray-700 mb-2">
            Nombre Trabajdor
          </label>
          <input
            value={worker.worker}
            name="worker"
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            onChange={(e) => Recordsworkers(e.target.name, e.target.value)}
          />
          {errors.workerExist && (
            <span className={`text-red-400 text-start mt-2`}>
              {errors.workerExist}
            </span>
          )}
          {errors.worker && (
            <span className={` text-red-400 text-start mt-2`}>
              {errors.worker}
            </span>
          )}
        </div>
        <div className="flex flex-col">
          <label className="text-start text-base font-semibold text-gray-700 mb-2">
            kilogramos Recogidos
          </label>
          <input
            value={worker.kilos}
            name="kilos"
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            onChange={(e) => {
              const justNumbers = e.target.value.replace(/\D/g, "");
              Recordsworkers(e.target.name, justNumbers);
            }}
          />
          {errors.kilos && (
            <span className={` text-red-400 text-start mt-2`}>
              {errors.kilos}
            </span>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          const newErrors = {
            precieKg: "",
            worker: "",
            kilos: "",
            workerExist: "",
          };
          let hasError = false;

          if ((kilosPrecio && !savePrecie) || !kilosPrecio) {
            newErrors.precieKg = "Ingresa precio kg a pagar";
            hasError = true;
          }

          if (!worker.worker.trim()) {
            newErrors.worker = "Por favor ingresa el nombre del trabajador";
            hasError = true;
          }

          if (!worker.kilos.trim()) {
            newErrors.kilos = "Por favor ingresa los kilos recogidos";
            hasError = true;
          }

          if (alreadyExists) {
            newErrors.workerExist = "El trabajador ya a sido registrado";
            hasError = true;
          }

          if (hasError) {
            setErrors(newErrors);
            return;
          }

          const fullWorker = {
            ...worker,
            date: getLocalDate(),
          };

          dataWorker(fullWorker);
          setworker(workerInit);
          setErrors(errorsInit);
        }}
        className="p-2 bg-green-700 rounded-lg mt-2 text-white"
      >
        Agregar Registro
      </button>
    </div>
  );
};
