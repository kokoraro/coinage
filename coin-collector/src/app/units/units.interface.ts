import { Unit } from "src/app/database/indexed-db.service";

export enum HistoryEvent {
  ADD,
  DELETE,
  SWAP,
  TOGGLE
}

export interface HistoryAdd {
  event: HistoryEvent.ADD;
  index: number;
}

export interface HistoryDelete {
  event: HistoryEvent.DELETE;
  unit: Unit;
}

export interface HistorySwap {
  event: HistoryEvent.SWAP;
  x: Unit;
  y: Unit;
}

export interface HistoryToggle {
  event: HistoryEvent.TOGGLE;
  unit: Unit;
}
