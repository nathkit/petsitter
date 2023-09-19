import "./App.css";
import { useAuth } from "./contexts/authentication";
import AuthenticatedApp from "./pages/AuthenticatedApp.jsx";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:4000";

function App() {
  const auth = useAuth();
  return <AuthenticatedApp />;
}

export default App;
