import Pokemons from "./components/Pokemons";
import { Provider } from "react-redux";
import generateStore from "./redux/store";

const App = () => {
  const store = generateStore();
  return (
    <Provider store={store}>
      <div className="container mt-2">
        <Pokemons />
      </div>
    </Provider>
  );
};

export default App;
