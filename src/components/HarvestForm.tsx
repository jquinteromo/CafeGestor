import { useState, useEffect } from "react";

type workerType = {
  worker: string;
  kilos: string;
  date: string;
};

const workerInit: workerType = {
  worker: "",
  kilos: "",
  date: "",
};

type HijosProp = {
  dataWorker: (value: workerType) => void;
};
export const HarvestForm = ({ dataWorker }: HijosProp) => {
  const [worker, setworker] = useState<workerType>(workerInit);

  const Recordsworkers = (name: string, value: string) => {
    setworker({
      ...worker,
      [name]: value,
    });
  };

  // useEffect(() => {
  //   console.log(worker);
  // }, [worker]);

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
            onChange={(e) => Recordsworkers(e.target.name, e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={() => {
          const fullWorker = {
            ...worker,
            date: new Date().toISOString().split("T")[0],
          };

          dataWorker(fullWorker);
          setworker(workerInit);
        }}
        className="p-2 bg-green-700 rounded-lg mt-2 text-white"
      >
        Agregar Registro
      </button>
    </div>
  );
};
