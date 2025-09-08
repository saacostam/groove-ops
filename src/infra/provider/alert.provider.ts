import Toastify from "toastify-js";
import type {
  AlertProviderMessageType,
  IAlertProvider,
} from "../../app/provider";

export class AlertProvider implements IAlertProvider {
  send(args: { msg: string; type: AlertProviderMessageType }): void {
    Toastify({
      text: args.msg,
      close: true,
      gravity: "bottom",
      position: "right",
      style: {
        background:
          args.type === "success"
            ? "#18bb9c"
            : args.type === "error"
              ? "#e84c3d"
              : "#f39c11",
      },
    }).showToast();
  }
}
