import { Board } from "./components/Board.jsx";
import { IssueDetail } from "./components/IssueDetail.jsx";
import { Router, useRouter } from "./context/RouterContext.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { UserProvider } from "./context/UserContext";

// App Content Router
const AppContent = () => {
  const { currentPath } = useRouter();

  if (currentPath === "/" || currentPath === "/board") {
    return <Board />;
  } else if (currentPath.startsWith("/issue/")) {
    return <IssueDetail />;
  } else {
    return <Board />;
  }
};

// Main App
const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <AppContent />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
