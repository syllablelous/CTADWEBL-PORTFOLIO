import './App.css'
import Layout from './components/Layout'
import AboutPage from './pages/LandingPages/AboutPage'
import ArticleListPage from './pages/LandingPages/ArticleListPage'
import ArticlePage from './pages/LandingPages/ArticlePage'
import HomePage from './pages/LandingPages/HomePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import RegistrationPage from './pages/RegistrationPage'
import WelcomePage from './pages/WelcomePage'
import DashLayout from './components/DashLayout'
import DashboardPage from './pages/DashboardPages/DashboardPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';
import DashArticleListPage from './pages/DashboardPages/DashArticleListPage';
import RoleBasedRoute from './components/RoleBasedRoute';
import AuthLayout from './components/AuthLayout'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ArticleDetailPage from './pages/LandingPages/ArticlePage'
import RegisterPage from './pages/RegistrationPage';

const routes = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'articles',
        element: <ArticleListPage />
      },
      {
        path: 'articles/:name',
        element: <ArticlePage />
      },
    ],
  },
  {
    path: '/login',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <LoginPage />
      },
    ],
  },
  {
    path: '/register',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <RegistrationPage />
      },
    ],
  },
  {
    path: '/welcome',
    element: <AuthLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: <WelcomePage />
      },
    ],
  },
  {
    path: '/dashboard',
    element: <DashLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '',
        element: (
          <RoleBasedRoute allowedRoles={['admin', 'viewer']}>
            <DashboardPage />
          </RoleBasedRoute>
        )
      },
      {
        path: 'users',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <UsersPage />
          </RoleBasedRoute>
        )
      },
      {
        path: 'reports',
        element: (
          <RoleBasedRoute allowedRoles={['admin']}>
            <ReportsPage />
          </RoleBasedRoute>
        )
      },
      {
        path: 'articles',
        element: (
          <RoleBasedRoute allowedRoles={['admin', 'editor']}>
            <DashArticleListPage />
          </RoleBasedRoute>
        )
      },
    ],
  },
]

const router = createBrowserRouter(routes);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Landing pages with navbar and footer */}
      <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/articles" element={<ArticleListPage />} />
        <Route path="/articles/:name" element={<ArticleDetailPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected dashboard routes with sidebar */}
      <Route
        element={
          <RoleBasedRoute allowedRoles={['admin', 'editor', 'viewer']}>
            <DashLayout />
          </RoleBasedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route
          path="/dashboard/users"
          element={
            <RoleBasedRoute allowedRoles={['admin']}>
              <UsersPage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/dashboard/reports"
          element={
            <RoleBasedRoute allowedRoles={['admin', 'editor']}>
              <ReportsPage />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/dashboard/articles"
          element={
            <RoleBasedRoute allowedRoles={['admin', 'editor']}>
              <DashArticleListPage />
            </RoleBasedRoute>
          }
        />
      </Route>

      {/* Redirect root to home page */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* 404 route - only match if no other routes match */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
};

export default App;
