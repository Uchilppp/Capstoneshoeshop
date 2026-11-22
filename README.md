# Capstone ReactJS - Cybersoft Shoes Shop

Dự án Capstone ReactJS **Shoes Shop** theo chuẩn thiết kế Figma và Swagger API của Cybersoft (`https://apistore.cybersoft.edu.vn`).

## 1. Công nghệ sử dụng
- **ReactJS 18** (Function Components & Hooks, Vite)
- **React Router DOM v6** (`BrowserRouter`, `Routes`, `Route`, `Outlet`, `ProtectedRoute`, `useNavigate`, `useParams`, `useSearchParams`)
- **Redux Toolkit** (`configureStore`, `createSlice`, `createAsyncThunk`)
- **Axios** (Axios instance + Request/Response Interceptors tự động gắn token `Authorization`)
- **Formik & Yup** (Validate form Đăng ký, Đăng nhập, Cập nhật Profile)
- **Lodash** (`orderBy` sắp xếp giá sản phẩm tăng dần / giảm dần)

## 2. Danh sách 7 trang chức năng
1. **Home (`/`)**: Carousel slider sản phẩm nổi bật + Lưới `Product Feature` + Thả tim yêu thích (`like` / `unlike`).
2. **Search (`/search`)**: Tìm kiếm sản phẩm theo tên (`GET /api/Product?keyword=`), sắp xếp giá giảm dần / tăng dần bằng `lodash`, lọc theo danh mục (`getAllCategory` / `getProductByCategory`).
3. **Detail (`/detail/:id`)**: Chi tiết sản phẩm (`GET /api/Product/getbyid?id=`), chọn size, chọn số lượng `+/-`, thêm vào giỏ hàng (`Add to cart`), danh sách `Related Product`.
4. **Carts (`/carts` - Protected)**: Quản lý giỏ hàng (Redux + `localStorage`), chọn checkbox từng món / tất cả, chỉnh sửa số lượng, xóa sản phẩm, đặt hàng (`POST /api/Users/order`).
5. **Register (`/register`)**: Đăng ký tài khoản mới (`POST /api/Users/signup`) với validate đầy đủ các trường.
6. **Login (`/login`)**: Đăng nhập (`POST /api/Users/signin`) và Đăng nhập Facebook (`POST /api/Users/facebooklogin`).
7. **Profile (`/profile` - Protected)**: Xem & cập nhật thông tin cá nhân (`POST /api/Users/getProfileV2`, `POST /api/Users/updateProfile`), lịch sử đơn hàng (`Order history` có phân trang) và danh sách sản phẩm yêu thích (`Favourite`).

## 3. Tài khoản dùng thử (Test Account)
- **Email**: `capstone_test_998877@gmail.com`
- **Password**: `Capstone@123`
