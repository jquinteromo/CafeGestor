import { useApp } from "../context/AppContext";
import { useState } from "react";

export default function PrecieKg() {
  const {
    setKilosPrecio,
    showpricePerKilo,
    setshowpricePerKilo,
    savePrecie,
    setsavePrecie,
    errors,
  } = useApp();
  const [pricePerKilo, setPricePerKilo] = useState<string>("");

  const PricePerKilo = (value: string) => {
    setKilosPrecio(value);
  };

  return (
    <div className="flex flex-col mt-6 ">
      <label
        className={`text-start text-base font-semibold text-gray-700  ml-2 ${
          !showpricePerKilo ? "mb-0" : "mb-2"
        }`}
      >
        Precio de Kilo{""}
        <span className={`${showpricePerKilo ? "visble" : "hidden"}`}>
          (Obligatorio)
        </span>
      </label>

      <div
        className={`${
          showpricePerKilo ? "hidden" : "flex"
        } w-full justify-between bg-gray-100 p-3 rounded-lg shadow-sm`}
      >
        <p className="text-lg font-semibold text-gray-800 ">
          ${parseInt(pricePerKilo).toLocaleString("es-CO")}
        </p>
        <button
          onClick={() => setshowpricePerKilo(true)}
          className="p-2 bg-green-700 text-white rounded-r-lg"
        >
          Editar
        </button>
      </div>

      {showpricePerKilo === true && (
        <div className="flex flex-row ">
          <input
            name="precie"
            type="text"
            className="w-full p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-300"
            value={
              pricePerKilo && !isNaN(parseInt(pricePerKilo))
                ? parseInt(pricePerKilo).toLocaleString("es-CO")
                : ""
            }
            onChange={(e) => {
              setPricePerKilo(e.target.value);
              PricePerKilo(e.target.value);
            }}
          />
          <input
            onClick={() => {
              if (!pricePerKilo) {
                return;
              }
              setshowpricePerKilo(false);
              setsavePrecie(true);
            }}
            type="button"
            value={"Guardar"}
            className=" p-2 bg-green-700 text-white rounded-r-lg"
          />
        </div>
      )}

      {savePrecie ||
        (errors.precieKg && (
          <span
            className={`${
              savePrecie && !pricePerKilo ? "hidden" : "visible"
            }   text-red-400 text-start mt-2`}
          >
            Guarda e ingresa un precio valido
          </span>
        ))}
    </div>
  );
}
