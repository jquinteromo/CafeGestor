import { SquarePen } from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
  const [editTable, seteditTable] = useState<boolean>(false);

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

  const selectedDayName = new Date(
    selectedDate + "T00:00:00-05:00"
  ).toLocaleDateString("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  useEffect(() => {
    if (recordWorker.length > 0) {
      const lastDate = recordWorker[recordWorker.length - 1].date;
      setSelectedDate(lastDate);
      setViewMode("daily");
    }
  }, [recordWorker]);

  const tdRef = useRef<HTMLTableCellElement>(null);
  useEffect(() => {
    tdRef.current?.focus();
  }, [editTable,viewMode]);

  return (
    <div
      className={`${
        recordWorker.length > 0 ? "visible" : "hidden"
      } bg-white p-4 shadow rounded-xl mb-8 `}
    >
      <h2 className="text-xl font-bold text-center text-green-700">
        Historial por Día y Trabajador
      </h2>


      <button 
       onClick={() => seteditTable(false)}
      className={`${editTable ? 'visible':'hidden'} ${viewMode=== "summary"? 'hidden':'visible'} flex items-center gap-1 bg-green-700 p-2 rounded-md text-white hover:underline text-sm font-medium mb-2 ml-auto mt-8`}>
        Guardar
      </button>

      <button
        onClick={() => seteditTable(true)}
        className={`${editTable || viewMode=== "summary" ? 'hidden':'visible'} flex items-center gap-1 text-green-700 hover:underline text-sm font-medium mb-2 ml-auto mt-8`}
      >
        <SquarePen size={16}></SquarePen>
        Editar día
      </button>

      <div className="grid grid-cols-4 gap-2  mb-8 mt-6">
        {availableDates.map((date) => {
          const dayName = new Date(date + "T00:00:00-05:00").toLocaleDateString(
            "es-ES",
            {
              weekday: "long",
            }
          );
          return (
            <button
              key={date}
              onClick={() => {
                setSelectedDate(date);
                setViewMode("daily");
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
          onClick={() => handleTotalClick()}
          className="px-3 py-1 rounded-full text-sm font-semibold transition text-white bg-black"
        >
          Total
        </button>
      </div>

      <p className={`text-sm text-gray-500 mb-2`}>
        {viewMode === "daily"
          ? "Cogida  " + selectedDayName
          : "Total de la semana"}{" "}
      </p>

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
                  <td
                    ref={index === 0 ? tdRef : null}
                    contentEditable={editTable}
                    className={`p-2 border border-gray-300 text-gray-700  ${
                      editTable
                        ? "focus:outline-none focus:ring-2 focus:ring-green-300"
                        : ""
                    } `}
                  >
                    {rec.worker}
                  </td>
                  <td
                    contentEditable={editTable}
                    className="p-2 border border-gray-300 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                  >
                    {rec.kilos}
                  </td>
                  <td className="p-2 border border-gray-300 text-gray-700">
                    $
                    {(
                      parseInt(kilosPrecio) * parseInt(rec.kilos)
                    ).toLocaleString()}
                  </td>
                </tr>
              ))
            : summary.map((rec, index) => (
                <tr key={index}>
                  <td className="p-2 border border-gray-300 text-gray-700">
                    {rec.worker}
                  </td>
                  <td className="p-2 border border-gray-300 text-gray-700">
                    {rec.totalKilos}
                  </td>
                  <td className="p-2 border border-gray-300 text-gray-700">
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
