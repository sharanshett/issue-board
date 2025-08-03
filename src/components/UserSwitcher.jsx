import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useUser } from "../context/UserContext";

export function UserSwitcher() {
  const { currentUser, users, switchUser } = useUser();
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: colors.surface,
          border: `1px solid ${colors.border}`,
          borderRadius: "8px",
          padding: "8px 16px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          color: colors.text,
          fontSize: "14px",
        }}
      >
        <span>{currentUser.avatar}</span>
        <div>
          <div style={{ fontWeight: "600" }}>{currentUser.name}</div>
          <div style={{ fontSize: "12px", color: colors.textSecondary }}>
            {currentUser.role}
          </div>
        </div>
        <span>▼</span>
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: "0",
            marginTop: "4px",
            background: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: "8px",
            boxShadow: colors.shadow,
            minWidth: "200px",
            zIndex: 1000,
          }}
        >
          {users.map((user) => (
            <button
              key={user.name}
              onClick={() => {
                switchUser(user);
                setIsOpen(false);
              }}
              style={{
                width: "100%",
                padding: "12px 16px",
                border: "none",
                background:
                  user.name === currentUser.name
                    ? colors.primary
                    : "transparent",
                color: user.name === currentUser.name ? "white" : colors.text,
                textAlign: "left",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
              }}
            >
              <span>{user.avatar}</span>
              <div>
                <div style={{ fontWeight: "600" }}>{user.name}</div>
                <div style={{ fontSize: "12px", opacity: 0.7 }}>
                  {user.role}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
