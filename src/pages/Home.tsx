import { PriceDisplay } from "../components/Pricedisplay";
import { HarvestForm } from "../components/HarvestForm";
import { CalendarSection } from "../components/CalendarSection";
// import AddNewHarvestButton from "../components/AddNewHarvestButton";
import PrecieKg from "../components/PrecieKg";
import { HistoryTable } from "../components/HistoryTable";
import { HandCoins } from "lucide-react";


export default function Home() {
  

  
  // function formatDate(date) {
  //   return date.toISOString().split("T")[0];
  // }

  //  const today = new Date();
  // const monday = new Date(today);
  // monday.setDate(today.getDate() - today.getDay() + 1); // lunes
  // const tuesday = new Date(monday);
  // tuesday.setDate(monday.getDate() + 1);
  // const wednesday = new Date(monday);
  // wednesday.setDate(monday.getDate() + 2);
  // const thursday = new Date(monday);
  // thursday.setDate(monday.getDate() + 3);
  // const friday = new Date(monday);
  // friday.setDate(monday.getDate() + 4);
  // const saturday = new Date(monday);
  // saturday.setDate(monday.getDate() + 5);

  // const mockWorkers = [
  //   { worker: "Pedro", kilos: "22", date: formatDate(monday) },
  //   { worker: "Lucía", kilos: "18", date: formatDate(monday) },

  //   { worker: "Juan", kilos: "25", date: formatDate(tuesday) },
  //   { worker: "Ana", kilos: "30", date: formatDate(tuesday) },

  //   { worker: "Carlos", kilos: "27", date: formatDate(wednesday) },
  //   { worker: "Lucía", kilos: "21", date: formatDate(wednesday) },

  //   { worker: "Sofía", kilos: "35", date: formatDate(thursday) },
  //   { worker: "Pedro", kilos: "20", date: formatDate(thursday) },

  //   { worker: "Ana", kilos: "32", date: formatDate(friday) },
  //   { worker: "Carlos", kilos: "28", date: formatDate(friday) },

  //   { worker: "Sofía", kilos: "29", date: formatDate(saturday) },
  //   { worker: "Juan", kilos: "33", date: formatDate(saturday) },
  // ];

 
 

  return (
    <main className=" bg-green-50 p-4  ">
      <h1 className="text-5xl font-bold mb-10 mt-6 text-green-800 flex justify-center items-center">
        CaféGestor <HandCoins size={38} className="ml-4"></HandCoins>
      </h1>

      <PriceDisplay />

      <div className="grid gap-6 lg:grid-cols-1">
        <PrecieKg />

        <section className=" rounded-2xl shadow bg-white">
          <HarvestForm />
        </section>
        <section className=" rounded-2xl shadow bg-white hidden">
          <CalendarSection />
        </section>
        <section className="  rounded-2xl shadow bg-white">
          <HistoryTable/>
        </section>
      </div>
    </main>
  );
}
