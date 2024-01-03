import { notifications } from "@mantine/notifications";

const toastTypes: any = {
  success: "green",
  error: "red",
  warning: "yellow",
};
const showMessage = (type: string, message: string, title: string = "") => {
  notifications.show({
    title,
    message,
    color: toastTypes[type] || "black",
    autoClose: 3000,
  });
};

export const toast = {
  success: (msg: string, title = "Success") =>
    showMessage("success", msg, title),
  error: (msg: string, title = "Error") => showMessage("error", msg, title),
  warning: (msg: string, title = "Warning") =>
    showMessage("warning", msg, title),
};
