import type { AlertProviderMessageType, IAlertProvider } from "../../app/provider";

export class AlertProvider implements IAlertProvider {
  send(args: { msg: string; type: AlertProviderMessageType; }): void {
    console.log(`[${args.type}] ${args.msg}`);
  }
}
