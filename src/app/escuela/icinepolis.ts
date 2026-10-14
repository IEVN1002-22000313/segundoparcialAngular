export interface Icinepolis {
  id: number; // identificador único para el CRUD
  nombre: string;
  cantidadCompradores: number;
  tarjetaCineco: boolean;
  cantidadBoletos: number;
  subtotal: number;
  descuentoBoletos: number;
  descuentoCineco: number;
  valorPagar: number;
}
