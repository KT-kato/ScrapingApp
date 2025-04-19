import { useSelector } from 'react-redux'
import { selectSessionStatus } from '../../../slices/sessionSlices'
import { Navigate, Outlet } from 'react-router'
import React from 'react'

type ProtectedRoutesProps = {
  children?: React.ReactNode
}

export const ProtectedRoutes = ({ children }: ProtectedRoutesProps) => {
  const { session } = useSelector(selectSessionStatus)

  if (!session) {
    return <Navigate to="/login" />
  }

  // このコンポーネントをOutletとして利用することも考慮する
  return children ? <>{children}</> : <Outlet />
}
