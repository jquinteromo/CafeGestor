import { useApp } from "../context/AppContext";
import axios from "axios";
import { useEffect } from "react";

export const PriceDisplay = () => {
  const {
     coffeePrice,
     setcoffeePrice
    } = useApp();
  // Simulado. En real podrías usar una API o una base de datos
  // const coffeePrice = 8450;

  async function obtenerPreciodeCafe() {
    try {
      const response = await axios.get(
        "https://preciocafe.onrender.com/api/precio"
      )
      const precio = response.data.precio;
      setcoffeePrice(precio)
    } catch (error) {
      console.error("Error al obtener el precio del café:", error);
    }
  }

  
    useEffect(() => {
      obtenerPreciodeCafe()
    }, []);
  

  return (
    <div className="bg-green-100 border border-green-300 rounded-2xl p-4 text-center mb-6">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Precio actual del café
      </h2>
      <p className="text-4xl font-bold text-red-600">  { coffeePrice ?  "$"+coffeePrice.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ".") : <span className="text-xl">Conéctate para consultar el precio</span>}</p>
    </div>
  );
};
