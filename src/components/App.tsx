import { BrowserRouter, Route, Routes, Navigate } from 'react-router'
import { Provider } from 'react-redux'
import { store } from '../slices/store'
import { Spinner } from './Spinner/Spinner'
import { LoginPage } from '../pages/LoginPage'
import { SignupPage } from '../pages/SignupPage'
import { HomePage } from '../pages/HomePage'
import { ModelDetailPage } from '../pages/ModelDetailPage'
import { ProtectedRoutes } from './common/ProtectedRoutes'

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
          <Route element={<ProtectedRoutes />}>
            <Route path="/home" element={<HomePage />} />
            <Route
              path="/brands/:blandId/models/:modelId"
              element={<ModelDetailPage />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}
