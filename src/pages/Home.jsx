import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProductsThunk } from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import polygonPrev from '../assets/polygon-prev.svg';
import polygonNext from '../assets/polygon-next.svg';
import carouselDot from '../assets/carousel-dot.svg';
import shoeSample from '../assets/shoe-sample.png';

export default function Home() {
  const dispatch = useDispatch();
  const { productList, loading, error } = useSelector((state) => state.product);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    dispatch(fetchProductsThunk(''));
  }, [dispatch]);

  const carouselItems = productList.slice(0, 3);
  const currentSlide = carouselItems[activeIndex] || productList[0] || null;

  const handlePrev = () => {
    if (carouselItems.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
  };

  const handleNext = () => {
    if (carouselItems.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % carouselItems.length);
  };

  useEffect(() => {
    if (isPaused || carouselItems.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % carouselItems.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, carouselItems.length]);

  return (
    <div className="home-page page-fade-in">
      <section
        className="carousel-section"
        data-node-id="2:18"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="container-1280 carousel-inner">
          <button
            type="button"
            className="carousel-arrow carousel-arrow-prev"
            onClick={handlePrev}
            aria-label="Previous slide"
            data-node-id="2:32"
          >
            <img src={polygonPrev} alt="Prev" className="carousel-arrow-img prev-rot" />
          </button>

          {currentSlide ? (
            <div key={currentSlide.id} className="carousel-content carousel-slide-anim">
              <div className="carousel-image-box" data-node-id="5703:499">
                <img
                  src={currentSlide.image || shoeSample}
                  alt={currentSlide.name}
                  className="carousel-shoe-img"
                />
              </div>

              <div className="carousel-info">
                <h2 className="carousel-title" data-node-id="2:36">
                  {currentSlide.name}
                </h2>
                <p className="carousel-desc" data-node-id="2:37">
                  {currentSlide.shortDescription || currentSlide.description}
                </p>
                <Link
                  to={`/detail/${currentSlide.id}`}
                  className="carousel-buy-btn"
                  data-node-id="2:38"
                >
                  Buy now
                </Link>
              </div>
            </div>
          ) : (
            <div className="carousel-placeholder">
              {loading ? 'Đang tải sản phẩm...' : 'Không có sản phẩm'}
            </div>
          )}

          <button
            type="button"
            className="carousel-arrow carousel-arrow-next"
            onClick={handleNext}
            aria-label="Next slide"
            data-node-id="2:31"
          >
            <img src={polygonNext} alt="Next" className="carousel-arrow-img next-rot" />
          </button>

          <div className="carousel-dots">
            {(carouselItems.length > 0 ? carouselItems : [1, 2, 3]).map((item, idx) => (
              <button
                key={item.id || idx}
                type="button"
                className={`carousel-dot-btn ${idx === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
              >
                <img src={carouselDot} alt="" className="carousel-dot-img" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="product-feature-section" data-node-id="2:54">
        <div className="container-1280">
          <div className="gradient-banner product-feature-banner" data-node-id="5703:500">
            <h1 className="gradient-banner-title" data-node-id="4:8">
              Product Feature
            </h1>
          </div>

          {loading && (
            <div className="status-box">Đang tải danh sách sản phẩm...</div>
          )}

          {error && !loading && (
            <div className="status-box error-text">{error}</div>
          )}

          {!loading && !error && productList.length === 0 && (
            <div className="status-box">Chưa có sản phẩm nào.</div>
          )}

          {!loading && !error && productList.length > 0 && (
            <div className="product-grid">
              {productList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
