import Dexie from 'dexie';
import { Parametro, Unit, Moneta } from './indexed-db.interface';

export class CoinsDB extends Dexie {

  conservazioni: Dexie.Table<Parametro, number>;
  contorni: Dexie.Table<Parametro, number>;
  denominazioni: Dexie.Table<Parametro, number>;
  materiali: Dexie.Table<Parametro, number>;
  rarita: Dexie.Table<Parametro, number>;
  segniZecche: Dexie.Table<Parametro, number>;
  sovranita: Dexie.Table<Parametro, number>;
  sovrani: Dexie.Table<Parametro, number>;
  stati: Dexie.Table<Parametro, number>;
  nominali: Dexie.Table<Parametro, number>;
  zecche: Dexie.Table<Parametro, number>;

  pesi: Dexie.Table<Unit, number>;
  lunghezze: Dexie.Table<Unit, number>;

  monete: Dexie.Table<Moneta, number>;
    
  constructor(name: string) {
    super(name);
    this.version(1).stores({
        conservazioni: '++id, value',
        contorni: '++id, value',
        denominazioni: '++id, value',
        materiali: '++id, value',
        rarita: '++id, value',
        segniZecche: '++id, value',
        sovranita: '++id, value',
        sovrani: '++id, value',
        stati: '++id, value',
        nominali: '++id, value',
        zecche: '++id, value',
        pesi: '++id, unit, prefix',
        lunghezze: '++id, unit, prefix',
        monete: '++id, codice, ambito, stato, sovrano, sovranita, nominale, denominazione, descrizione, anno, segnoAnno, zecca, segnoZecca, tiratura, materiale, rarita, conservazione, diametro, peso, contorno, valore, immagine, fornitore, dataAcquisto, prezzoAcquisto, fattura, perizia, note'
    });
  }

}