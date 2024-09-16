export enum SnackType {
  SUCCESS,
  ERROR,
  INFO
}

export interface SnackMessage {
  type: SnackType,
  message: string,
  log: string,
  object ?: any
}
