import { GlobalProvider } from "./context/GlobalState";
import Signup from "../src/components/Signup";

function App() {
  return (
    <GlobalProvider>
      <Signup />
    </GlobalProvider>
  );
}

export default App;
