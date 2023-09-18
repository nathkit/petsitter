import "./App.css";
import { useAuth } from "./contexts/authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp.jsx";

function App() {
  const auth = useAuth();
  return <AuthenticatedApp />;
}

export default App;
