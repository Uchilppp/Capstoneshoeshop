import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import ProtectedRoute from './ProtectedRoute';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Detail from '../pages/Detail';
import Carts from '../pages/Carts';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Profile from '../pages/Profile';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="detail/:id" element={<Detail />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path="profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="carts"
          element={
            <ProtectedRoute>
              <Carts />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}
