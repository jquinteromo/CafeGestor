import { useState, useEffect } from "react";

type workerType = {
  worker: string;
  kilos: string;
  date: string;
};

type workerTotalType = {
  worker: string;
  totalKilos: number;
  totalDinero: number;
};

type HijosProp = {
  recordWorker: workerType[];
  kilosPrecio: string;
};

export const HistoryTable = ({ recordWorker, kilosPrecio }: HijosProp) => {
  const availableDates = Array.from(new Set(recordWorker.map((r) => r.date)));
  const [selectedDate, setSelectedDate] = useState(availableDates[0]);
  const [viewMode, setViewMode] = useState<"daily" | "summary">("daily");
  const [summary, setsummary] = useState<workerTotalType[]>([]);

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
    setViewMode("summary");
  };

  const filtered = recordWorker.filter((r) => r.date === selectedDate);

  const selectedDayName = new Date(selectedDate).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });


  useEffect(() => {
    console.log(recordWorker);
  }, [recordWorker]);
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
              onClick={() => {
                setSelectedDate(date)
              setViewMode("daily")
              }}
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
        <button
          onClick={() => handleTotalClick() }
          className="px-3 py-1 rounded-full text-sm font-semibold transition text-white bg-black"
        >
          Total
        </button>
      </div>

      <p className={`text-sm text-gray-500 mb-2`}>{viewMode === 'daily'? "Cogida Hoy  "+ selectedDayName: "Total de la semana"} </p>

      <table className="w-full text-sm border table-auto">
        <thead className="bg-green-100 text-green-800">
          <tr>
            <th className="p-2 border">Trabajador</th>
            <th className="p-2 border">Kg</th>
            <th className="p-2 border">Total</th>
          </tr>
        </thead>
        <tbody>
          {viewMode === "daily"
            ? filtered.map((rec, index) => (
                <tr key={index}>
                   <td className="p-2 border border-gray-300 text-gray-700" >{rec.worker}</td>
                   <td className="p-2 border border-gray-300 text-gray-700" >{rec.kilos}</td>
                   <td className="p-2 border border-gray-300 text-gray-700" >
                    $
                    {(
                      parseInt(kilosPrecio) * parseInt(rec.kilos)
                    ).toLocaleString()}
                  </td>
                </tr>
              ))
            : summary.map((rec, index) => (
                <tr key={index}>
                  <td className="p-2 border border-gray-300 text-gray-700" >{rec.worker}</td>
                     <td className="p-2 border border-gray-300 text-gray-700" >{rec.totalKilos}</td>
                     <td className="p-2 border border-gray-300 text-gray-700" >
                    ${(parseInt(kilosPrecio) * rec.totalKilos).toLocaleString()}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>

      <div className="w-full flex flex-row gap-4 mt-6">
        <input
          name="kilos"
          type="search"
          className={`${
            recordWorker.length >= 8 ? "visible" : "hidden"
          } flex-1 w-full p-2 border border-gray-400/90 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 placeholder:text-gray-600 text-sm`}
          placeholder="Buscar Trabajador"
        />
        <button
          className={`${
            recordWorker.length >= 8 ? "visible" : "hidden"
          } flex-1 bg-green-700 rounded-lg text-sm text-white`}
        >
          Ver más trabajdores
        </button>
      </div>
    </div>
  );
};
