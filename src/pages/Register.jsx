import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { signUpThunk, clearAuthStatus } from '../redux/slices/userSlice';
import eyeIcon from '../assets/eye-icon.svg';
import eyeIcon2 from '../assets/eye-icon-2.svg';
import radioSelected from '../assets/radio-selected.svg';
import radioSelected2 from '../assets/radio-selected-2.svg';
import btnLeadingIcon from '../assets/btn-leading-icon.svg';
import sectionLine from '../assets/section-line.svg';

const registerSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Email không đúng định dạng')
    .required('Email không được để trống'),
  password: Yup.string()
    .min(6, 'Mật khẩu phải từ 6 ký tự trở lên')
    .required('Mật khẩu không được để trống'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không khớp')
    .required('Vui lòng xác nhận mật khẩu'),
  name: Yup.string()
    .trim()
    .required('Họ tên không được để trống'),
  phone: Yup.string()
    .matches(/^(0|\+84)[0-9]{8,10}$/, 'Số điện thoại không hợp lệ (9-11 số)')
    .required('Số điện thoại không được để trống'),
  gender: Yup.boolean().required('Vui lòng chọn giới tính'),
});

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authLoading, authError, registerSuccess } = useSelector(
    (state) => state.user
  );

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    dispatch(clearAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    if (registerSuccess) {
      const timer = setTimeout(() => {
        dispatch(clearAuthStatus());
        navigate('/login');
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [registerSuccess, dispatch, navigate]);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      phone: '',
      gender: true,
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      dispatch(
        signUpThunk({
          email: values.email.trim(),
          password: values.password,
          name: values.name.trim(),
          gender: Boolean(values.gender),
          phone: values.phone.trim(),
        })
      );
    },
  });

  return (
    <div className="register-page" data-node-id="24:289">
      <div className="container-1280 register-inner">
        <h1 className="page-main-heading register-heading" data-node-id="24:290">
          Register
        </h1>

        <div className="section-divider-wrap" data-node-id="5704:847">
          <img src={sectionLine} alt="" />
        </div>

        {registerSuccess && (
          <div className="alert-banner success-banner">
            Đăng ký tài khoản thành công! Đang chuyển sang trang Login...
          </div>
        )}

        {authError && (
          <div className="alert-banner error-banner">{authError}</div>
        )}

        <form className="register-form-grid" onSubmit={formik.handleSubmit} noValidate>
          <div className="register-col">
            <div className="figma-textfield" data-node-id="5703:563">
              <label htmlFor="reg-email" className="figma-label">
                Email
              </label>
              <input
                id="reg-email"
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
              <label htmlFor="reg-password" className="figma-label" data-node-id="5703:546">
                Password
              </label>
              <div className="figma-input-with-icon" data-node-id="5703:543">
                <input
                  id="reg-password"
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
                  data-node-id="5704:664"
                >
                  <img src={eyeIcon} alt="Toggle password" />
                </button>
              </div>
              <p className="figma-validation-text">
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : ''}
              </p>
            </div>

            <div className="figma-textfield" data-node-id="5703:581">
              <label htmlFor="reg-password-confirm" className="figma-label" data-node-id="5715:483">
                Password confirm
              </label>
              <div className="figma-input-with-icon">
                <input
                  id="reg-password-confirm"
                  name="passwordConfirm"
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="figma-input"
                  placeholder="password confirm"
                  value={formik.values.passwordConfirm}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <button
                  type="button"
                  className="figma-eye-btn"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  aria-label="Toggle confirm password visibility"
                  data-node-id="5703:547"
                >
                  <img src={eyeIcon2} alt="Toggle password confirm" />
                </button>
              </div>
              <p className="figma-validation-text">
                {formik.touched.passwordConfirm && formik.errors.passwordConfirm
                  ? formik.errors.passwordConfirm
                  : ''}
              </p>
            </div>
          </div>

          <div className="register-col">
            <div className="figma-textfield" data-node-id="5703:591">
              <label htmlFor="reg-name" className="figma-label">
                Name
              </label>
              <input
                id="reg-name"
                name="name"
                type="text"
                className="figma-input"
                placeholder="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="figma-validation-text">
                {formik.touched.name && formik.errors.name ? formik.errors.name : ''}
              </p>
            </div>

            <div className="figma-textfield" data-node-id="5703:600">
              <label htmlFor="reg-phone" className="figma-label">
                Phone
              </label>
              <input
                id="reg-phone"
                name="phone"
                type="tel"
                className="figma-input"
                placeholder="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="figma-validation-text">
                {formik.touched.phone && formik.errors.phone ? formik.errors.phone : ''}
              </p>
            </div>

            <div className="figma-gender-row">
              <span className="figma-label gender-title" data-node-id="5704:663">
                Gender
              </span>

              <div className="figma-radio-group">
                <button
                  type="button"
                  className={`figma-radio-option ${formik.values.gender === true ? 'selected' : ''}`}
                  onClick={() => formik.setFieldValue('gender', true)}
                  data-node-id="5704:651"
                >
                  <img
                    src={radioSelected}
                    alt="Male"
                    className={`figma-radio-svg ${formik.values.gender === true ? 'active' : 'inactive'}`}
                  />
                  <span className="figma-radio-text">Male</span>
                </button>

                <button
                  type="button"
                  className={`figma-radio-option ${formik.values.gender === false ? 'selected' : ''}`}
                  onClick={() => formik.setFieldValue('gender', false)}
                  data-node-id="5704:623"
                >
                  <img
                    src={radioSelected2}
                    alt="Female"
                    className={`figma-radio-svg ${formik.values.gender === false ? 'active' : 'inactive'}`}
                  />
                  <span className="figma-radio-text">Femail</span>
                </button>
              </div>
            </div>

            <div className="register-submit-wrap">
              <button
                type="submit"
                className="figma-pill-btn"
                disabled={authLoading}
                data-node-id="5704:846"
              >
                <img src={btnLeadingIcon} alt="" />
                <span>{authLoading ? 'SUBMITTING...' : 'SUBMIT'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
