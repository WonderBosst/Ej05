import { FormControl } from '@angular/forms';

export interface Evento {
  id?: string;
  fecha: string;
  hora: string;
  cliente: string;
  celular: string;
  tipo: string;
  descripcion: string;
  alberca: number;
  mesaRegalos: boolean;
  colorSobremantel: string[];
  personas: number;
  brincolin: boolean;
  precio: number;
  anticipo: number;
  metodo: string;
  saldo: number;
  estado: string;
}

export interface EventoForm {
  fecha: FormControl<string>;
  hora: FormControl<string>;
  cliente: FormControl<string>;
  celular: FormControl<string>;
  tipo: FormControl<string>;
  descripcion: FormControl<string>;
  alberca: FormControl<number>;
  mesaRegalos: FormControl<boolean>;
  colorSobremantel: FormControl<string[]>;
  personas: FormControl<number>;
  brincolin: FormControl<boolean>;
  precio: FormControl<number>;
  anticipo: FormControl<number>;
  metodo: FormControl<string>;
  saldo: FormControl<number>;
}