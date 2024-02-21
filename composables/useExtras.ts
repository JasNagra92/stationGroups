import { Notify } from "quasar";
export const CsMsg = (message: string, color: string) => {
  Notify.setDefaults({
    timeout: 500,
  });

  Notify.create({
    progress: true,
    message: message,
    color: color,
    position: "center",
    icon: "fa-solid fa-triangle-exclamation",
  });
};
