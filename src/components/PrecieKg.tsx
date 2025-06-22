import { useState } from "react";

type HijosProp = {
  PricePerKilo: (value: string) => void;
};

export default function PrecieKg({ PricePerKilo }: HijosProp) {
  const [pricePerKilo, setPricePerKilo] = useState<string>("");
  const [showpricePerKilo, setshowpricePerKilo] = useState<boolean>(true);

  return (
    <div className="flex flex-col mt-6 ">
      <label className="text-start text-base font-semibold text-gray-700 mb-2">
        Precio de Kilo
      </label>

      <div
        className={`${
          showpricePerKilo === true ? "hidden" : "visible"
        } w-full flex flex-row items-center gap-2`}
      >
        <p className="text-start text-gray-800 mb-2">
          ${parseInt(pricePerKilo).toLocaleString("es-CO")}
        </p>
        <button
          onClick={() => setshowpricePerKilo(true)}
          className="text-sm rounded-sm text-white p-1 bg-green-700 mb-2"
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
            onClick={() => setshowpricePerKilo(false)}
            type="button"
            value={"Guardar"}
            className=" p-2 bg-green-700 text-white rounded-r-lg"
          />
        </div>
      )}
    </div>
  );
}
