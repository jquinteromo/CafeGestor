import { useApp } from "../context/AppContext";
import { SquarePen, Trash, Trash2 } from "lucide-react";
import { useState, useEffect, useRef } from "react";

import type { workerType} from "../../Types/Types";
import type { workerTotalType} from "../../Types/Types";
import type { cosechTotalType } from "../../Types/Types";


export const HistoryTable = () => {
const {
    recordWorker,
    setrecordWorker,
    kilosPrecio,
  } = useApp();


  const availableDates = Array.from(new Set(recordWorker.map((r) => r.date)));

  const [selectedDate, setSelectedDate] = useState(availableDates[0]);
  const [viewMode, setViewMode] = useState<"daily" | "summary">("daily");
  const [summary, setsummary] = useState<workerTotalType[]>([]);
  const [summaryCosesh, setsummaryCosesh] = useState<cosechTotalType[]>([]);
  const [editTable, seteditTable] = useState<boolean>(false);
  const [workerUpdate, setworkerUpdate] = useState<workerType[]>([]);
  const [filtered, setfiltered] = useState<workerType[]>([]);

  const workerupdate = (index: number, prop: string, value: string) => {
    const updatedItem = { ...workerUpdate[index] };
    updatedItem[prop as keyof workerType] = value;
    const updatedList = [...workerUpdate];
    updatedList[index] = updatedItem;
    setworkerUpdate(updatedList);
  };

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

  useEffect(() => {
    console.log(recordWorker);
  }, [recordWorker]);

  useEffect(() => {
    setfiltered(recordWorker.filter((r) => r.date === selectedDate))
  }, [selectedDate,recordWorker]);

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
  }, [editTable, viewMode]);

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

      <table className="w-full text-sm border table-auto">
        <thead className="bg-green-100 text-green-800">
          <tr>
            <th className="p-2 border">Trabajador</th>
            <th className="p-2 border">Kg</th>
            <th className="p-2 border">Total</th>
            <th
              className={`${
                viewMode === "summary" ? "hidden" : "visible"
              } p-2 border flex justify-center`}
            >
              <Trash width={20} className=""></Trash>
            </th>
          </tr>
        </thead>
        <tbody>
          {viewMode === "daily"
            ? filtered.map((rec, index) => (
                <tr key={index}>
                  <td
                    onBlur={(e) =>
                      workerupdate(index, "worker", e.currentTarget.innerText)
                    }
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
                    onBlur={(e) =>
                      workerupdate(index, "kilos", e.currentTarget.innerText)
                    }
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
                  <td
                    onClick={() => {
                      alert("Seguro que deseas eliminar al trabjador?")
                      setfiltered( filtered.filter(
                        (worker) =>
                          !(
                            rec.worker === worker.worker &&
                            worker.date === selectedDate
                          )
                      ))
                    }}
                    className="p-2 border border-gray-300 text-red-700 flex justify-center"
                  >
                    <Trash2 width={20} className=""></Trash2>
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
