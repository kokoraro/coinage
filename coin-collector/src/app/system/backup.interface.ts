import { Parametro, Unit, Moneta } from 'src/app/database/indexed-db.service';

export interface Backup {
  conservazioni: Parametro[];
  contorni: Parametro[];
  denominazioni: Parametro[];
  materiali: Parametro[];
  rarita: Parametro[];
  segniZecche: Parametro[];
  sovranita: Parametro[];
  sovrani: Parametro[];
  stati: Parametro[];
  nominali: Parametro[];
  zecche: Parametro[];
  pesi: Unit[];
  lunghezze: Unit[];
  monete: Moneta[];
}

export const BACKUP_PROPERTIES_COUNT = 14;
