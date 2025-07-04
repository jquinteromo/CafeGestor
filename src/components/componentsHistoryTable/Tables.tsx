import {  Trash, Trash2 } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useWorkerLogic } from "../../hooks/useWorkerLogic";
import {  useRef,useEffect } from "react";

export default function TableWorker() {
  const {
    viewMode,
    filtered,
    setfiltered,
    selectedDate,
    summary,
    editTable,
    kilosPrecio,
  } = useApp();

   const { workerupdate } = useWorkerLogic();

    const tdRef = useRef<HTMLTableCellElement>(null);

    useEffect(() => {
    tdRef.current?.focus();
    tdRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [editTable, viewMode]);

  return (
    <div>
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
                    onBlur={(e) => {
                      workerupdate(index, "worker", e.currentTarget.innerText);
                    }}
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
                      alert("Seguro que deseas eliminar al trabjador?");
                      setfiltered(
                        filtered.filter(
                          (worker) =>
                            !(
                              rec.worker === worker.worker &&
                              worker.date === selectedDate
                            )
                        )
                      );
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
    </div>
  );
}
