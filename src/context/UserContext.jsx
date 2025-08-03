import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const users = [
    { name: "Alice", role: "admin", avatar: "👩‍💼" },
    { name: "Bob", role: "contributor", avatar: "👨‍💻" },
  ];

  const [currentUser, setCurrentUser] = useState(users[0]);

  const switchUser = (user) => {
    setCurrentUser(user);
  };

  const canDragDrop = () => {
    return currentUser.role === "admin";
  };

  const canMarkResolved = () => {
    return currentUser.role === "admin";
  };

  const value = {
    currentUser,
    users,
    switchUser,
    canDragDrop,
    canMarkResolved,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
