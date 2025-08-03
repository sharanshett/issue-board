import { useEffect, useState } from "react";

const Toast = ({ toast, onRemove, onAction, colors }) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (toast.action) {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            onRemove(toast.id);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [toast, onRemove]);

  return (
    <div
      style={{
        backgroundColor: colors.surface,
        border: `1px solid ${colors.border}`,
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "8px",
        boxShadow: colors.shadow,
        display: "flex",
        alignItems: "center",
        gap: "12px",
        minWidth: "350px",
      }}
    >
      <div style={{ flex: 1, color: colors.text }}>{toast.message}</div>
      <div style={{ display: "flex", gap: "8px" }}>
        {toast.action && (
          <button
            onClick={() => onAction(toast.action)}
            style={{
              backgroundColor: colors.primary,
              color: "white",
              border: "none",
              borderRadius: "4px",
              padding: "4px 8px",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            {toast.action.label} ({countdown}s)
          </button>
        )}
        <button
          onClick={() => onRemove(toast.id)}
          style={{
            backgroundColor: "transparent",
            color: colors.textSecondary,
            border: `1px solid ${colors.border}`,
            borderRadius: "4px",
            padding: "4px 8px",
            fontSize: "12px",
            cursor: "pointer",
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
