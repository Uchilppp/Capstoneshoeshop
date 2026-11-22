import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  signInThunk,
  facebookLoginThunk,
  clearAuthStatus,
} from '../redux/slices/userSlice';
import { FB_APP_ID } from '../utils/constants';
import eyeIcon from '../assets/eye-icon.svg';
import facebookIcon from '../assets/facebook-icon.svg';
import btnLeadingIcon from '../assets/btn-leading-icon.svg';
import sectionLine from '../assets/section-line.svg';

const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Email không đúng định dạng')
    .required('Email không được để trống'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải từ 6 ký tự trở lên')
    .required('Mật khẩu không được để trống'),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { accessToken, authLoading, authError } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const redirectPath = location.state?.from || '/profile';

  useEffect(() => {
    dispatch(clearAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (accessToken) {
      navigate(redirectPath, { replace: true });
    }
  }, [accessToken, navigate, redirectPath]);

  useEffect(() => {
    const initFb = () => {
      if (window.FB) {
        window.FB.init({
          appId: FB_APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v18.0',
        });
      }
    };

    if (window.FB) {
      initFb();
      return;
    }

    window.fbAsyncInit = function () {
      initFb();
    };

    const scriptId = 'facebook-jssdk';
    if (!document.getElementById(scriptId)) {
      const js = document.createElement('script');
      js.id = scriptId;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      js.async = true;
      js.defer = true;
      document.body.appendChild(js);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(
        signInThunk({
          email: values.email.trim(),
          password: values.password,
        })
      );
    },
  });

  const handleFacebookLogin = () => {
    if (window.FB) {
      window.FB.login(
        (response) => {
          if (response?.authResponse?.accessToken) {
            dispatch(facebookLoginThunk(response.authResponse.accessToken));
          }
        },
        { scope: 'public_profile,email' }
      );
    } else {
      const redirectUri = encodeURIComponent(window.location.origin + '/login');
      window.open(
        `https://www.facebook.com/v18.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${redirectUri}&response_type=token&scope=email,public_profile`,
        'facebook-login-popup',
        'width=600,height=700'
      );
    }
  };

  useEffect(() => {
    if (window.location.hash && window.location.hash.includes('access_token=')) {
      const params = new URLSearchParams(window.location.hash.replace('#', '?'));
      const fbToken = params.get('access_token');
      if (fbToken) {
        window.history.replaceState(null, '', window.location.pathname);
        dispatch(facebookLoginThunk(fbToken));
      }
    }
  }, [dispatch]);

  return (
    <div className="login-page" data-node-id="5704:703">
      <div className="container-1280 login-inner">
        <h1 className="page-main-heading login-heading" data-node-id="5704:848">
          Login
        </h1>

        <div className="section-divider-wrap" data-node-id="5704:849">
          <img src={sectionLine} alt="" />
        </div>

        <form className="login-form-box" onSubmit={formik.handleSubmit} noValidate>
          {authError && (
            <div className="alert-banner error-banner">{authError}</div>
          )}

          <div className="figma-textfield" data-node-id="5704:711">
            <label htmlFor="login-email" className="figma-label">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              className="figma-input"
              placeholder="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <p className="figma-validation-text">
              {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
            </p>
          </div>

          <div className="figma-textfield">
            <label htmlFor="login-password" className="figma-label" data-node-id="5704:710">
              Password
            </label>
            <div className="figma-input-with-icon" data-node-id="5704:705">
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className="figma-input"
                placeholder="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button
                type="button"
                className="figma-eye-btn"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label="Toggle password visibility"
                data-node-id="5704:707"
              >
                <img src={eyeIcon} alt="Toggle password" />
              </button>
            </div>
            <p className="figma-validation-text" data-node-id="5704:713">
              {formik.touched.password && formik.errors.password
                ? formik.errors.password
                : ''}
            </p>
          </div>

          <div className="login-actions-row">
            <Link to="/register" className="login-register-link" data-node-id="5704:850">
              Register now ?
            </Link>

            <button
              type="submit"
              className="figma-pill-btn"
              disabled={authLoading}
              data-node-id="5704:745"
            >
              <img src={btnLeadingIcon} alt="" />
              <span>{authLoading ? 'LOADING...' : 'LOGIN'}</span>
            </button>
          </div>

          <button
            type="button"
            className="facebook-login-btn"
            onClick={handleFacebookLogin}
            data-node-id="5715:516"
          >
            <img
              src={facebookIcon}
              alt="Facebook"
              className="facebook-btn-icon"
              data-node-id="5715:518"
            />
            <span className="facebook-btn-text" data-node-id="5715:519">
              Continue with Facebook
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
