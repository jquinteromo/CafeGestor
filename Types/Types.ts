//tipado trabjador
export type workerType = {
  worker: string;
  kilos: string;
  date: string;
  originalWorker?: string;
};



//tiopado errores registro 
export type Errors = {
  precieKg: string;
  worker: string;
  kilos: string;
  workerExist: string;
};

//Tipado total de trabajador
export type workerTotalType = {
  worker: string;
  totalKilos: number;
  totalDinero: number;
};

//Tipado Total de cosecha

export type cosechTotalType = {
  worker: string;
  totalDinero: number;
  totalKilos: number;
};
