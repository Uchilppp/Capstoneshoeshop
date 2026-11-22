import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { fetchFavoritesThunk } from '../redux/slices/userSlice';

export default function MainLayout() {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.user);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchFavoritesThunk());
    }
  }, [accessToken, dispatch]);

  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
