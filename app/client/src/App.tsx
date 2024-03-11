import "./App.css";
import { AppProvider } from "./providers/AppProviders";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </>
  );
}

export default App;
