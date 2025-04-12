import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { Provider } from "react-redux";
import { store } from "../slices/store";
import { Spinner } from "./Spinner/Spinner";
import { LoginPage } from "../pages/LoginPage";
import { SignupPage } from "../pages/SignupPage";
import { HomePage } from "../pages/HomePage";
import { ModelDetailPage } from "../pages/ModelDetailPage";
import { useSelector } from "../slices/store";
import { selectSessionStatus } from "../slices/sessionSlices";
import { useEffect } from "react";
import { useNavigate } from "react-router";

// 認証済みユーザーのみがアクセスできるページを保護するコンポーネント
const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const { session } = useSelector(selectSessionStatus);
  const navigate = useNavigate();

  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]);

  return session ? <>{children}</> : null;
};

// メインのアプリケーションコンポーネント
export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Spinner />
        <Routes>
          {/* 認証関連のルート */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* 保護されたルート */}
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/brands/:blandId/models/:modelId"
            element={
              <PrivateRoute>
                <ModelDetailPage />
              </PrivateRoute>
            }
          />

          {/* 旧ルートのリダイレクト（後方互換性のため） */}
          <Route
            path="/home/bland/:blandId/model/:modelId"
            element={<Navigate to="/brands/:blandId/models/:modelId" replace />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};
