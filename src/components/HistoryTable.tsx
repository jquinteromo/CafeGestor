import { useState, useEffect } from "react";

type workerType = {
  worker: string;
  kilos: string;
  date: string;
};

type HijosProp = {
  recordWorker: workerType[];
  kilosPrecio: string;
};

export const HistoryTable = ({ recordWorker, kilosPrecio }: HijosProp) => {
  const availableDates = Array.from(new Set(recordWorker.map((r) => r.date)));
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);
  const filtered = recordWorker.filter((r) => r.date === selectedDate);

  const selectedDayName = new Date(selectedDate).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    console.log(recordWorker);
  }, []);
  return (
    <div
      className={`${
        recordWorker.length > 0 ? "visible" : "hidden"
      } bg-white p-4 shadow rounded-xl mb-10 `}
    >
      <h2 className="text-xl font-bold text-green-700 mb-4">
        Historial por Día y Trabajador
      </h2>

      <div className="flex flex-wrap gap-2 mb-4">
        {availableDates.map((date) => {
          const dayName = new Date(date).toLocaleDateString("es-ES", {
            weekday: "long",
          });
          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                selectedDate === date
                  ? "bg-green-600 text-white"
                  : "bg-green-100 text-green-800"
              }`}
            >
              {dayName}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-gray-500 mb-2">Cogida Hoy {selectedDayName}</p>

      <table className="w-full text-sm border table-auto">
        <thead className="bg-green-100 text-green-800">
          <tr>
            <th className="p-2 border">Trabajador</th>
            <th className="p-2 border">Kg</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((rec, index) => (
            <tr key={index} className="text-gray-700">
              <td className="p-2 border">{rec.worker}</td>
              <td className="p-2 border">{rec.kilos}</td>
              <td className="p-2 border font-semibold text-green-800">
                $
                {(parseInt(kilosPrecio) * parseInt(rec.kilos)).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="w-full flex flex-row gap-4">
        <input
          name="kilos"
          type="search"
          className={`${
            recordWorker.length >= 8 ? "visible" : "hidden"
          } flex-1 w-full mt-4 p-2 border border-gray-400/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 placeholder:text-gray-600 text-sm`}
          placeholder="Buscar Trabajador"
        />
        <button
        className="flex-1"
        >
          Ver  más trabajdores
        </button>
      </div>
    </div>
  );
};
