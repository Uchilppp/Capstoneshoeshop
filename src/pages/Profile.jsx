import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  fetchProfileThunk,
  updateProfileThunk,
  fetchFavoritesThunk,
  clearUpdateStatus,
} from '../redux/slices/userSlice';
import ProductCard from '../components/ProductCard';
import eyeIcon from '../assets/eye-icon.svg';
import radioSelected from '../assets/radio-selected.svg';
import radioSelected2 from '../assets/radio-selected-2.svg';
import btnLeadingIcon from '../assets/btn-leading-icon.svg';
import sectionLine from '../assets/section-line.svg';
import qtyBoxBg from '../assets/qty-box-bg.svg';
import shoeSample from '../assets/shoe-sample.png';

const profileSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Email không đúng định dạng')
    .required('Email không được để trống'),
  name: Yup.string()
    .trim()
    .required('Họ tên không được để trống'),
  phone: Yup.string()
    .matches(/^(0|\+84)[0-9]{8,10}$/, 'Số điện thoại không hợp lệ')
    .required('Số điện thoại không được để trống'),
  password: Yup.string().nullable(),
  gender: Yup.boolean().required(),
});

const ORDERS_PER_PAGE = 2;

export default function Profile() {
  const dispatch = useDispatch();
  const {
    profile,
    favoriteProducts,
    profileLoading,
    profileError,
    updateLoading,
    updateSuccess,
    updateError,
  } = useSelector((state) => state.user);

  const [activeTab, setActiveTab] = useState('orders');
  const [showPassword, setShowPassword] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(clearUpdateStatus());
    dispatch(fetchProfileThunk());
    dispatch(fetchFavoritesThunk());
  }, [dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: profile?.email || '',
      name: profile?.name || '',
      phone: profile?.phone || '',
      password: profile?.password || '',
      gender: profile?.gender ?? true,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(
        updateProfileThunk({
          email: values.email.trim(),
          name: values.name.trim(),
          phone: values.phone.trim(),
          password: values.password || '',
          gender: Boolean(values.gender),
        })
      );
    },
  });

  const ordersHistory = Array.isArray(profile?.ordersHistory)
    ? [...profile.ordersHistory].reverse()
    : [];

  const totalPages = Math.max(1, Math.ceil(ordersHistory.length / ORDERS_PER_PAGE));
  const paginatedOrders = ordersHistory.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const formatOrderDate = (dateStr) => {
    if (!dateStr) return '09 - 19 - 2020';
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${mm} - ${dd} - ${yyyy}`;
  };

  return (
    <div className="profile-page" data-node-id="5715:340">
      <div className="container-1280 profile-inner">
        <div className="gradient-banner profile-banner" data-node-id="5715:437">
          <h1 className="gradient-banner-title" data-node-id="5715:438">
            Profile
          </h1>
        </div>

        {profileLoading && !profile && (
          <div className="status-box">Đang tải thông tin hồ sơ...</div>
        )}

        {profileError && !profile && (
          <div className="status-box error-text">{profileError}</div>
        )}

        {updateSuccess && (
          <div className="alert-banner success-banner">{updateSuccess}</div>
        )}

        {updateError && (
          <div className="alert-banner error-banner">{updateError}</div>
        )}

        <div className="profile-top-grid">
          <div className="profile-avatar-col" data-node-id="5715:436">
            <img
              src={
                profile?.avatar ||
                `https://i.pravatar.cc/225?u=${profile?.email || 'cybersoft'}`
              }
              alt={profile?.name || 'User Avatar'}
              className="profile-avatar-img"
            />
          </div>

          <form className="profile-form-grid" onSubmit={formik.handleSubmit} noValidate>
            <div className="profile-form-col">
              <div className="figma-textfield" data-node-id="5715:440">
                <label htmlFor="prof-email" className="figma-label">
                  Email
                </label>
                <input
                  id="prof-email"
                  name="email"
                  type="email"
                  className="figma-input"
                  placeholder="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  readOnly
                />
                <p className="figma-validation-text">
                  {formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                </p>
              </div>

              <div className="figma-textfield" data-node-id="5715:449">
                <label htmlFor="prof-phone" className="figma-label">
                  Phone
                </label>
                <input
                  id="prof-phone"
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
            </div>

            <div className="profile-form-col">
              <div className="figma-textfield" data-node-id="5715:458">
                <label htmlFor="prof-name" className="figma-label">
                  Name
                </label>
                <input
                  id="prof-name"
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

              <div className="figma-textfield" data-node-id="5730:726">
                <label htmlFor="prof-password" className="figma-label" data-node-id="5730:735">
                  Password
                </label>
                <div className="figma-input-with-icon">
                  <input
                    id="prof-password"
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
                  >
                    <img src={eyeIcon} alt="Toggle password" />
                  </button>
                </div>
                <p className="figma-validation-text" />
              </div>

              <div className="profile-gender-update-row" data-node-id="5730:719">
                <div className="figma-gender-row">
                  <span className="figma-label gender-title">Gender</span>
                  <div className="figma-radio-group">
                    <button
                      type="button"
                      className={`figma-radio-option ${formik.values.gender === true ? 'selected' : ''}`}
                      onClick={() => formik.setFieldValue('gender', true)}
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

                <button
                  type="submit"
                  className="figma-pill-btn profile-update-btn"
                  disabled={updateLoading}
                  data-node-id="5717:15691"
                >
                  <img src={btnLeadingIcon} alt="" />
                  <span>{updateLoading ? '...' : 'Update'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="section-divider-wrap profile-divider" data-node-id="5715:343">
          <img src={sectionLine} alt="" />
        </div>

        <div className="profile-tabs-bar">
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
            data-node-id="5715:515"
          >
            Order history
          </button>
          <button
            type="button"
            className={`profile-tab-btn ${activeTab === 'favourite' ? 'active' : ''}`}
            onClick={() => setActiveTab('favourite')}
            data-node-id="5716:15673"
          >
            Favourite
          </button>
        </div>

        {activeTab === 'orders' && (
          <div className="profile-orders-section">
            {ordersHistory.length === 0 ? (
              <div className="status-box">Bạn chưa có đơn hàng nào.</div>
            ) : (
              <>
                {paginatedOrders.map((order) => (
                  <div key={order.id} className="profile-order-block" data-node-id="5717:15703">
                    <p className="profile-order-date" data-node-id="5717:15734">
                      + Orders have been placed on {formatOrderDate(order.date)}
                    </p>

                    <table className="carts-table profile-order-table">
                      <thead>
                        <tr className="carts-thead-row">
                          <th className="col-id">id</th>
                          <th className="col-img">img</th>
                          <th className="col-name">name</th>
                          <th className="col-price">price</th>
                          <th className="col-qty">quantity</th>
                          <th className="col-total">total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(order.orderDetail || []).map((item, idx) => (
                          <tr key={`${order.id}-${idx}`} className="carts-tbody-row">
                            <td className="col-id">{order.id}</td>
                            <td className="col-img">
                              <img
                                src={item.image || shoeSample}
                                alt={item.name}
                                className="carts-row-img"
                              />
                            </td>
                            <td className="col-name">{item.name}</td>
                            <td className="col-price">{item.price}</td>
                            <td className="col-qty">
                              <div className="cart-qty-value-box">
                                <img src={qtyBoxBg} alt="" className="cart-qty-bg-svg" />
                                <span className="cart-qty-value-text">{item.quantity}</span>
                              </div>
                            </td>
                            <td className="col-total">
                              {Number(item.price) * Number(item.quantity)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}

                <div className="profile-pagination" data-node-id="5715:542">
                  <button
                    type="button"
                    className="page-nav-btn"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  >
                    &lt;
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      type="button"
                      className={`page-num-btn ${currentPage === page ? 'active' : ''}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    type="button"
                    className="page-nav-btn"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  >
                    &gt;
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {activeTab === 'favourite' && (
          <div className="profile-favourite-section">
            {favoriteProducts.length === 0 ? (
              <div className="status-box">Chưa có sản phẩm yêu thích nào.</div>
            ) : (
              <div className="product-grid">
                {favoriteProducts.map((fav) => (
                  <ProductCard
                    key={fav.id}
                    product={{
                      id: fav.id,
                      name: fav.name,
                      image: fav.image,
                      price: fav.price ?? 85,
                      shortDescription: fav.shortDescription || 'Favourite shoe',
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
