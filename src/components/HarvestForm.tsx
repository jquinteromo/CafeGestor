import { useState } from "react";

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

type Errors = {
  precieKg: string;
  worker: string;
  kilos: string;
};

const errorsInit: Errors = {
  precieKg: "",
  worker: "",
  kilos: "",
};

type HijosProp = {
  dataWorker: (value: workerType) => void;
  recordWorker: workerType[];
  kilosPrecio: string;
  showpricePerKilo: boolean;
  savePrecie: boolean;
  setErrors: (value: Errors) => void;
  errors: Errors;
};

export const HarvestForm = ({
  dataWorker,
  recordWorker,
  kilosPrecio,
  savePrecie,
  setErrors,
  errors,
}: HijosProp) => {
  const [worker, setworker] = useState<workerType>(workerInit);

  const alreadyExists = recordWorker.some(
    (r) =>
      r.worker.toLowerCase().trim() === worker.worker.toLowerCase().trim() &&
      r.date === new Date().toISOString().split("T")[0]
  );

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
          {alreadyExists && (
            <span
              className={`${
                alreadyExists ? "visible" : "hidden"
              }  text-red-400 text-start mt-2`}
            >
              Ya se registro el trabjador hoy
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
          const newErrors = { precieKg: "", worker: "", kilos: "" };
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

          if (hasError) {
            setErrors(newErrors);
            return;
          }

          if (alreadyExists) {
            return;
          }

          const fullWorker = {
            ...worker,
            date: new Date().toISOString().split("T")[0],
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
