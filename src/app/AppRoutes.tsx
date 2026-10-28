import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Login from '../pages/Login'
import PageLoader from '../components/ui/PageLoader'
import ErrorBoundary from '../components/ui/ErrorBoundary'

const Layout = lazy(() => import('../components/layout/Layout'))
const Dashboard = lazy(() => import('../pages/Dashboard'))
const Outlets = lazy(() => import('../pages/Outlets'))
const MapView = lazy(() => import('../pages/MapView'))
const Analytics = lazy(() => import('../pages/Analytics'))

const ProtectedPages = ({ onLogout }: { onLogout: () => void }) => (
  <ErrorBoundary>
    <Suspense fallback={<PageLoader />}>
      <Layout onLogout={onLogout}>
        <ErrorBoundary>
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </Suspense>
  </ErrorBoundary>
)

const AppRoutes = () => {
  const { isLoggedIn, login, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (isLoggedIn) navigate('/outlets')
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [isLoggedIn, navigate])

  return (
    <Routes>
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" replace /> : <Login onLogin={login} />}
      />
      <Route
        path="/"
        element={isLoggedIn ? <ProtectedPages onLogout={logout} /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Dashboard />} />
        <Route path="outlets" element={<Outlets />} />
        <Route path="map" element={<MapView />} />
        <Route path="analytics" element={<Analytics />} />
      </Route>
      <Route path="*" element={<Navigate to={isLoggedIn ? '/' : '/login'} replace />} />
    </Routes>
  )
}

export default AppRoutes
