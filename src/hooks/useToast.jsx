import { useState } from "react";

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "success", action = null) => {
    const id = Date.now();
    const toast = { id, message, type, action };
    setToasts((prev) => [...prev, toast]);

    setTimeout(
      () => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      },
      action ? 5000 : 3000
    );
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
}
