import { Parametro, Ambito, Unit } from './indexed-db.interface';

export const ambiti: Ambito[] = [
    { id: 'REP_VEN', display: 'Repubblica di Venezia' },
    { id: 'VE1_RSA', display: 'Vittorio Emanuele I' },
    { id: 'CFE_RSA', display: 'Carlo Felice' },
    { id: 'CAL_RSA', display: 'Carlo Alberto' },
    { id: 'VE2_RSA', display: 'Vittorio Emanuele II - Re di Sardegna' },
    { id: 'VE2_REL', display: 'Vittorio Emanuele II - Re eletto' },
    { id: 'VE2_RIT', display: 'Vittorio Emanuele I - Re d\'Italia' },
    { id: 'UM1_RIT', display: 'Umberto I' },
    { id: 'VE3_RIT', display: 'Vittorio Emanuele III' },
    { id: 'UM1_COL', display: 'Umberto I - Colonie' },
    { id: 'VE3_COL', display: 'Vittorio Emanuele III - Colonie' },
    { id: 'AFS_COL', display: 'Amministrazione Fiduciaria Italiana Somalia' },
    { id: 'ITA_LIR', display: 'Repubblica Italiana' },
    { id: 'SMN_LIR', display: 'San Marino' },
    { id: 'VAT_LIR', display: 'Città del Vaticano' }
];

export const conservazioni: Parametro[] = [
    { value: 'B' },
    { value: 'MB' },
    { value: 'qBB' },
    { value: 'BB' },
    { value: 'BB+' },
    { value: 'qSPL' },
    { value: 'SPL' },
    { value: 'SPL+' },
    { value: 'qFDC' },
    { value: 'FDC' }
];

export const contorni: Parametro[] = [
    { value: 'LISCIO' },
    { value: 'RIGATO' }
];

export const denominazioni: Parametro[] = [
    { value: 'VALORE' },
    { value: 'DONNA SU PRORA' },
    { value: 'SPIGA' },
    { value: 'IMPERO' },
];
  
export const materiali: Parametro[] = [
    { value: 'RAME' },
    { value: 'RAME DORATO' },
    { value: 'BRONZO' },
    { value: 'NICHELIO' },
    { value: 'ACMONITAL AM' },
    { value: 'ACMONITAL M' },
    { value: 'ORO' },
    { value: 'ARGENTO' }
];

export const rarita: Parametro[] = [
    { value: 'C' },
    { value: 'CC' },
    { value: 'NC' },
    { value: 'R' },
];

export const segniZecche: Parametro[] = [
    { value: 'M' },
    { value: 'W' },
    { value: 'N' },
    { value: 'B' },
];
  
export const sovranita: Parametro[] = [
    { value: 'RE DI SARDEGNA'},
    { value: 'RE ELETTO D\'ITALIA' },
    { value: 'RE D\'ITALIA' },
    { value: 'RE DELL\'ALBANIA' },
    { value: 'RE DELL\'ERITREA' },
    { value: 'RE DELLA SOMALIA' }
];

export const sovrani: Parametro[] = [
    { value: 'VITTORIO EMANUELE I'},
    { value: 'CARLO FELICE' },
    { value: 'CARLO ALBERTO' },
    { value: 'VITTORIO EMANUELE II' },
    { value: 'UMBERTO PRIMO' },
    { value: 'VITTORIO EMANUELE III' }
];

export const stati: Parametro[] = [
    { value: 'ITALIA'},
    { value: 'FRANCIA' },
    { value: 'INGHILTERRA' },
    { value: 'VENEZIA' }
];

export const nominali: Parametro[] = [
    { value: '1 CENT'},
    { value: '2 CENT' },
    { value: '5 CENT' },
    { value: '10 CENT' },
    { value: '20 CENT' },
    { value: '25 CENT' },
    { value: '50 CENT' },
    { value: '1 LIRA' },
    { value: '2 LIRE' },
    { value: '5 LIRE' },
    { value: '20 LIRE' },
    { value: '50 LIRE' },
    { value: '100 LIRE' },
    { value: 'BUONO 1 LIRA' },
    { value: 'BuONO 2 LIRE' }
];

export const zecche: Parametro[] = [
    { value: 'ROMA' },
    { value: 'MILANO' },
    { value: 'TORINO' },
    { value: 'NAPOLI' }
];

export const pesi: Unit[] = [
    { unit: 'g', prefix: true },
    { unit: 'oz', prefix: false }
];

export const lunghezze: Unit[] = [
    { unit: 'm', prefix: true },
    { unit: 'in', prefix: false },
    { unit: 'ft', prefix: false }
];