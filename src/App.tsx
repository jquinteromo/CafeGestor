import "./App.css";
import Home from "./pages/Home";
import { AppProvider } from "./context/AppContext";


function App() {
  return (
    <AppProvider>
      <Home></Home>
    </AppProvider>
  );
}

export default App;
