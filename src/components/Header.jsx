import { useSelector, useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/slices/userSlice';
import cybersoftLogo from '../assets/cybersoft-logo.png';
import searchIcon from '../assets/search-icon.png';
import menuLine from '../assets/menu-line.svg';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, userLogin, profile } = useSelector((state) => state.user);
  const { items } = useSelector((state) => state.cart);

  const totalCartCount = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
  const displayName = profile?.name || userLogin?.email || 'Profile';

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="site-header-wrapper">
      <div className="header-top-bar" data-node-id="2:8">
        <div className="container-1280 header-top-inner">
          <Link to="/" className="header-logo-link" data-node-id="2:22">
            <img src={cybersoftLogo} alt="Cybersoft Logo" className="header-logo-img" />
          </Link>

          <div className="header-actions">
            <Link to="/search" className="header-search-link" data-node-id="5722:688">
              <img src={searchIcon} alt="Search" className="header-search-icon" />
              <span className="header-search-text">Search</span>
            </Link>

            <Link to="/carts" className="header-cart-link" data-node-id="5702:368">
              <span className="header-cart-icon" role="img" aria-label="cart">
                🛒
              </span>
              <span className="header-cart-count">({totalCartCount})</span>
            </Link>

            {accessToken ? (
              <>
                <Link to="/profile" className="header-auth-link" title={displayName}>
                  {displayName}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="header-auth-link header-logout-btn"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="header-auth-link" data-node-id="2:16">
                  Login
                </Link>
                <Link to="/register" className="header-auth-link" data-node-id="2:17">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <nav className="header-menu-bar" data-node-id="2:47">
        <div className="container-1280 header-menu-inner">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `header-menu-item header-menu-home ${isActive ? 'active' : ''}`
            }
            data-node-id="2:48"
          >
            <span>Home</span>
            <img src={menuLine} alt="" className="header-menu-underline" />
          </NavLink>
          <Link to="/search?category=MEN" className="header-menu-item muted" data-node-id="2:49">
            Men
          </Link>
          <Link to="/search?category=WOMEN" className="header-menu-item muted" data-node-id="2:53">
            Woman
          </Link>
          <Link to="/search?keyword=kid" className="header-menu-item" data-node-id="2:50">
            Kid
          </Link>
          <Link to="/search?keyword=sport" className="header-menu-item" data-node-id="2:51">
            Sport
          </Link>
        </div>
      </nav>
    </header>
  );
}
