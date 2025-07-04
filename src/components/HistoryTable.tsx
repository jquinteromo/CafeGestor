import { useApp } from "../context/AppContext";
import { SquarePen } from "lucide-react";
import { useEffect } from "react";
import { useWorkerLogic } from "../hooks/useWorkerLogic";
import TableWorker from "./componentsHistoryTable/Tables";

export const HistoryTable = () => {
  const {
    recordWorker,
    setworkerUpdate,
    summaryCosesh,
    viewMode,
    setViewMode,
    filtered,
    setfiltered,
    editTable,
    seteditTable,
    selectedDate,
    setSelectedDate,
  } = useApp();

  const availableDates = Array.from(new Set(recordWorker.map((r) => r.date)));

  const {handleGuardar, handleTotalClick ,selectedDayName} = useWorkerLogic();


  useEffect(() => {
    console.log(recordWorker);
  }, [recordWorker]);

  useEffect(() => {
    setfiltered(recordWorker.filter((r) => r.date === selectedDate));
  }, [selectedDate, recordWorker]);

  

  useEffect(() => {
    if (recordWorker.length > 0) {
      const lastDate = recordWorker[recordWorker.length - 1].date;
      setSelectedDate(lastDate);
      setViewMode("daily");
    }
  }, [recordWorker]);

 
  
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
        onClick={() => {
          seteditTable(false);
          handleGuardar();
        }}
        className={`${editTable ? "visible" : "hidden"} ${
          viewMode === "summary" ? "hidden" : "visible"
        } flex items-center gap-1 bg-green-700 p-2 rounded-md text-white hover:underline text-sm font-medium mb-2 ml-auto mt-8`}
      >
        Guardar
      </button>

      <button
        onClick={() => {
          seteditTable(true);
          setworkerUpdate(
            filtered.map((r) => ({
              ...r,
              originalWorker: r.worker,
            }))
          );
        }}
        className={`${
          editTable || viewMode === "summary" ? "hidden" : "visible"
        } flex items-center gap-1 text-green-700 hover:underline text-sm font-medium mb-2 ml-auto mt-8`}
      >
        <SquarePen size={16}></SquarePen>
        Editar día
      </button>

      <div className="grid grid-cols-4 gap-2  mb-8 mt-6">
        {availableDates.map((date) => {
          const [y, m, d] = date.split("-");
          const dayName = new Date(
            Number(y),
            Number(m) - 1,
            Number(d)
          ).toLocaleDateString("es-ES", {
            weekday: "long",
          });
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
          onClick={() => {
            handleTotalClick();
          }}
          className="px-3 py-1 rounded-full text-sm font-semibold transition text-white bg-black"
        >
          Total
        </button>
      </div>

      <p className={`text-sm text-gray-500 mb-2`}>
        {viewMode === "daily"
          ? "Cogida  " + selectedDayName
          : "Total Trabajador"}{" "}
      </p>

    <TableWorker></TableWorker>

      <p
        className={`${
          viewMode === "summary" ? "visible" : "hidden"
        } text-sm text-gray-500 mt-10`}
      >
        Total Semana
      </p>
      <table
        className={`${
          viewMode === "summary" ? "visible" : "hidden"
        } w-full text-sm border table-auto mt-2`}
      >
        <thead className=" bg-green-100 text-green-800">
          <tr>
            <th className="p-2 border">kg Recogidos semana</th>
            <th className="p-2 border">$ Pagar Semana</th>
          </tr>
        </thead>
        <tbody>
          {summaryCosesh.map((rec, index) => (
            <tr key={index}>
              <td className="p-2 border border-gray-300 text-gray-700">
                {rec.totalKilos}
              </td>
              <td>
                {rec.totalDinero.toLocaleString("es-CO", {
                  style: "currency",
                  currency: "COP",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
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
