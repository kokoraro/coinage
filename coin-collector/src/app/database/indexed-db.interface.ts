export interface Ambito {
  id: string;
  display: string;
}

export interface Parametro {
  id ?: number;
  value: string;
}

export interface Unit {
  id ?: number;
  unit: string;
  prefix ?: boolean;
}

export interface Moneta {
  id?: number;
  codice: string;
  ambito: string;
  stato: string;
  sovrano?: string;
  sovranita?: string;
  nominale: string;
  denominazione?: string;
  descrizione: string;
  anno: string;
  segnoAnno?: string;
  zecca: string;
  segnoZecca: string;
  tiratura: string;
  materiale: string;
  rarita: string;
  conservazione: string;
  diametro: string;
  peso: string;
  contorno: string;
  valore: number;
  immagine: string;
  fornitore?: string;
  dataAcquisto?: string;
  prezzoAcquisto?: number;
  fattura?: string;
  perizia: string;
  note?: string;
}
