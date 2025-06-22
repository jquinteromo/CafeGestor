import { Plus } from "lucide-react"

export default function AddNewHarvestButton (){
return(
      <div className="hidden relative w-full md:h-72  h-96 bg-green-100 bg-opacity-40 flex items-center justify-center flex-row ">
      <button
        className="bg-white text-green-700 border border-green-300 text-xl font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:bg-green-50 flex"
      >
        <Plus className="mt-0.5"></Plus> Agregar nueva cosecha
      </button>
    </div>
)
}