import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "../slices/store.ts";
import { Login } from "./login/Login.tsx";
import { Home } from "./home/Home.tsx";
import { Signup } from "./signup/Signup.tsx";
import { ModelDetail } from "./modelDetail/ModelDetail.tsx";
import { Spinner } from "./Spinner/Spinner.tsx";

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Spinner />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route
            path="/home/bland/:blandId/model/:modelId"
            element={<ModelDetail />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
