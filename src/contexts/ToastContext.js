import SnackBar from "../components/SnackBar.js";
import { createContext } from "react";
import { useState } from "react";

export const ToastContext = createContext({});

export default function ToastProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }

  return (
    <ToastContext.Provider value={{ toastFn: showHideToast, open, message }}>
      <SnackBar toast={showHideToast} open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
}
