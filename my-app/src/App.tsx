import { List } from "./components/List";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./slices/store";

function App() {
  return (
    <Provider store={store}>
      <div className="app">
        <List />
      </div>
    </Provider>
  );
}

export default App;
