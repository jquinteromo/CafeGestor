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

type Errors = {
  precieKg: string;
  worker: string;
  kilos: string;
};

export default function Home() {
  const [kilosPrecio, setKilosPrecio] = useState<string>("");
  const [recordWorker, setrecordWorker] = useState<workerType[]>([]);
  
  
  const [showpricePerKilo, setshowpricePerKilo] = useState<boolean>(true);

  //SE GAURDO EL PRECIO DE KG
  const [savePrecie, setsavePrecie] = useState<boolean>(false);

   const [errors, setErrors] = useState<Errors>({
    precieKg:"",
    worker: "",
    kilos: "",
  });


  // const formatDate = (date: Date) => date.toISOString().split("T")[0];

  // const today = new Date();
  // const yesterday = new Date(today);
  // yesterday.setDate(today.getDate() - 1);

  // // const mockWorkers = [
  // //   {
  // //     worker: "Pedro",
  // //     kilos: "25",
  // //     date: formatDate(today), // hoy
  // //   },
  // //   {
  // //     worker: "Juan",
  // //     kilos: "30",
  // //     date: formatDate(yesterday), // ayer
  // //   },
  // //   {
  // //     worker: "Pedro",
  // //     kilos: "15",
  // //     date: formatDate(yesterday), // ayer
  // //   },
  // ];

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
        <PrecieKg
          PricePerKilo={PricePerKilo}
    
          setshowpricePerKilo={setshowpricePerKilo}
          showpricePerKilo={showpricePerKilo}
          setsavePrecie={setsavePrecie}
          savePrecie={savePrecie}
          errorPreciekg={errors.precieKg}
        ></PrecieKg>

        <section className=" rounded-2xl shadow bg-white">
          <HarvestForm
            dataWorker={dataWorker}
            recordWorker={recordWorker}
            kilosPrecio={kilosPrecio}
           
            showpricePerKilo={showpricePerKilo}
            savePrecie={savePrecie}
            setErrors = {setErrors}
            errors ={errors}
          />
        </section>
        <section className=" rounded-2xl shadow bg-white hidden">
          <CalendarSection />
        </section>
        <section className="  rounded-2xl shadow bg-white">
          <HistoryTable recordWorker={recordWorker} kilosPrecio={kilosPrecio} />
        </section>
      </div>
    </main>
  );
}
