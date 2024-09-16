import { Parametro } from 'src/app/database/indexed-db.service';

export enum HistoryEvent {
  ADD,
  DELETE,
  SWAP
}

export interface HistoryAdd {
  event: HistoryEvent;
  index: number;
}

export interface HistoryDelete {
  event: HistoryEvent;
  parametro: Parametro;
}

export interface HistorySwap {
  event: HistoryEvent;
  x: Parametro;
  y: Parametro;
}
