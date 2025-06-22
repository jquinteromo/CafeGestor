export const PriceDisplay = () => {
  // Simulado. En real podrías usar una API o una base de datos
  // const coffeePrice = 8450; 

  return (
    <div className="bg-green-100 border border-green-300 rounded-2xl p-4 text-center mb-6">
      <h2 className="text-xl font-semibold text-green-700 mb-2">
        Precio actual del café
      </h2>
      <p className="text-4xl font-bold text-green-900">
        $0
      </p>
    </div>
  );
};
