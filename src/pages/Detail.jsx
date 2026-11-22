import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProductDetailThunk } from '../redux/slices/productSlice';
import { addToCart } from '../redux/slices/cartSlice';
import ProductCard from '../components/ProductCard';
import QuantityInput from '../components/QuantityInput';
import shoeSample from '../assets/shoe-sample.png';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail, detailLoading, detailError } = useSelector(
    (state) => state.product
  );

  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetailThunk(id));
      setQuantity(1);
      setAddedFeedback(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (productDetail?.size?.length > 0) {
      setSelectedSize(productDetail.size[0]);
    } else {
      setSelectedSize(null);
    }
  }, [productDetail]);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => Math.max(1, prev - 1));
  };

  const handleAddToCart = () => {
    if (!productDetail) return;
    dispatch(
      addToCart({
        id: productDetail.id,
        name: productDetail.name,
        price: productDetail.price,
        image: productDetail.image,
        quantity,
        size: selectedSize,
      })
    );
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const availableSizes = Array.isArray(productDetail?.size)
    ? productDetail.size
    : ['38', '39', '40', '41', '42'];

  const relatedProducts = Array.isArray(productDetail?.relatedProducts)
    ? productDetail.relatedProducts
    : [];

  return (
    <div className="detail-page">
      <div className="container-1280">
        {detailLoading && (
          <div className="status-box">Đang tải thông tin chi tiết sản phẩm...</div>
        )}

        {detailError && !detailLoading && (
          <div className="status-box error-text">{detailError}</div>
        )}

        {!detailLoading && !detailError && productDetail && (
          <>
            <section className="detail-top-section" data-node-id="6:73">
              <div className="detail-image-frame" data-node-id="12:150">
                <img
                  src={productDetail.image || shoeSample}
                  alt={productDetail.name}
                  className="detail-main-img"
                  data-node-id="12:151"
                />
              </div>

              <div className="detail-info-column">
                <h1 className="detail-product-name" data-node-id="12:157">
                  {productDetail.name}
                </h1>

                <p className="detail-product-desc" data-node-id="12:158">
                  {productDetail.description}
                </p>

                <h3 className="detail-size-label" data-node-id="12:159">
                  Available size
                </h3>

                <div className="detail-size-list">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`detail-size-btn ${
                        String(selectedSize) === String(size) ? 'active' : ''
                      }`}
                      onClick={() => setSelectedSize(size)}
                      data-node-id="14:237"
                    >
                      {size}
                    </button>
                  ))}
                </div>

                <p className="detail-product-price" data-node-id="12:155">
                  {productDetail.price}$
                </p>

                <QuantityInput
                  variant="detail"
                  quantity={quantity}
                  onIncrease={handleIncrease}
                  onDecrease={handleDecrease}
                />

                <div className="detail-cart-action">
                  <button
                    type="button"
                    className="detail-add-cart-btn"
                    onClick={handleAddToCart}
                    data-node-id="12:153"
                  >
                    Add to cart
                  </button>
                  {addedFeedback && (
                    <span className="detail-added-toast">
                      ✓ Đã thêm vào giỏ hàng!
                    </span>
                  )}
                </div>
              </div>
            </section>

            <section className="detail-related-section" data-node-id="6:93">
              <h2 className="detail-related-title" data-node-id="6:94">
                -Realate Product -
              </h2>

              <div className="product-grid">
                {relatedProducts.map((relProd) => (
                  <ProductCard key={relProd.id} product={relProd} />
                ))}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
