import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { Provider } from "react-redux";
import { store } from "./slices/store.ts";
import { Login } from "./components/login/Login.tsx";
import { Home } from "./components/home/Home.tsx";
import { Signup } from "./components/signup/Signup.tsx";
import { ModelDetail } from "./components/modelDetail/ModelDetail.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home/:modelId" element={<ModelDetail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
