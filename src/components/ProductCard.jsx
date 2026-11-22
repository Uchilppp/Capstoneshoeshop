import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toggleLikeProductThunk } from '../redux/slices/userSlice';
import shoeSample from '../assets/shoe-sample.png';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accessToken, favoriteProducts } = useSelector((state) => state.user);

  const isFavorite = favoriteProducts.some(
    (fav) => Number(fav.id) === Number(product.id)
  );

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!accessToken) {
      navigate('/login');
      return;
    }
    dispatch(toggleLikeProductThunk(product.id));
  };

  return (
    <div className="product-card" data-node-id="14:170">
      <button
        type="button"
        className="product-card-heart"
        onClick={handleToggleLike}
        aria-label={isFavorite ? 'Unlike product' : 'Like product'}
        title={isFavorite ? 'Bỏ yêu thích' : 'Yêu thích'}
      >
        {isFavorite ? '❤️' : '♡'}
      </button>

      <div className="product-card-img-wrap" data-node-id="3:3">
        <img
          src={product.image || shoeSample}
          alt={product.name}
          className="product-card-img"
          onError={(e) => {
            e.currentTarget.src = shoeSample;
          }}
        />
      </div>

      <h3 className="product-card-name" title={product.name} data-node-id="4:16">
        {product.name}
      </h3>

      <p
        className="product-card-desc"
        title={product.shortDescription || product.description}
        data-node-id="4:17"
      >
        {product.shortDescription || product.description || 'short descript ...'}
      </p>

      <div className="product-card-footer">
        <Link
          to={`/detail/${product.id}`}
          className="product-card-buy-btn"
          data-node-id="4:11"
        >
          Buy now
        </Link>
        <div className="product-card-price-box" data-node-id="4:14">
          <span className="product-card-price">{product.price}$</span>
        </div>
      </div>
    </div>
  );
}
