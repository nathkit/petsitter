import "./App.css";
import { useAuth } from "./contexts/authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp.jsx";
import axios from "axios";
import UnauthenticatedApp from "./pages/UnauthenticatedApp";
axios.defaults.baseURL = "http://localhost:4000/";

function App() {
  const auth = useAuth();
  return auth.isAuthenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

export default App;
