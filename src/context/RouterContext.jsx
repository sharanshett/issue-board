import { createContext, useContext, useEffect, useState } from "react";

const RouterContext = createContext();

export function Router({ children }) {
  const [currentPath, setCurrentPath] = useState("/board");

  const navigate = (path) => {
    setCurrentPath(path);
    window.history.pushState(null, "", path);
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const params = {};
  const issueMatch = currentPath.match(/^\/issue\/(.+)$/);
  if (issueMatch) {
    params.id = issueMatch[1];
  }

  return (
    <RouterContext.Provider value={{ currentPath, navigate, params }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a Router");
  }
  return context;
}
