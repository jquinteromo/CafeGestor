import { useState } from "react";
import { PriceDisplay } from "../components/Pricedisplay";
import { HarvestForm } from "../components/HarvestForm";
import { CalendarSection } from "../components/CalendarSection";
import AddNewHarvestButton from "../components/AddNewHarvestButton";
import PrecieKg from "../components/PrecieKg";
import { HistoryTable } from "../components/HistoryTable";
import { HandCoins } from "lucide-react";

type workerType = {
  worker: string;
  kilos: string;
  date: string;
};

export default function Home() {
  const [kilosPrecio, setKilosPrecio] = useState<string>("");
  const [recordWorker, setrecordWorker] = useState<workerType[]>([]);

  const PricePerKilo = (value: string) => {
    setKilosPrecio(value);
  };

  const dataWorker = (value: workerType) => {
    setrecordWorker((prev) => [...prev, value]);
  };

  return (
    <main className=" bg-green-50 p-4  ">

      <h1 className="text-4xl font-bold mb-10 text-green-800 flex justify-center items-center">
        CaféGestor <HandCoins size={34} className="ml-4"></HandCoins>
      </h1>

      <PriceDisplay />
      <AddNewHarvestButton></AddNewHarvestButton>
      <div className="grid gap-6 lg:grid-cols-1">
        <PrecieKg PricePerKilo={PricePerKilo}></PrecieKg>
        <section className=" rounded-2xl shadow bg-white">
          <HarvestForm
            dataWorker={dataWorker}
            // kilosPrecio={kilosPrecio}
          />
        </section>
        <section className=" rounded-2xl shadow bg-white hidden">
          <CalendarSection />
        </section>
        <section className="  rounded-2xl shadow bg-white">
          <HistoryTable recordWorker={recordWorker} kilosPrecio={kilosPrecio}/>
        </section>
      </div>
    </main>
  );
}
