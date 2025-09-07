export type AlertProviderMessageType = "success" | "error" | "warning";

export interface IAlertProvider {
  send(args: {
    msg: string,
    type: AlertProviderMessageType,
  }): void;
}
