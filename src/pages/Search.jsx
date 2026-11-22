import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import orderBy from 'lodash/orderBy';
import {
  searchProductsThunk,
  fetchCategoriesThunk,
  fetchProductsByCategoryThunk,
} from '../redux/slices/productSlice';
import ProductCard from '../components/ProductCard';
import selectArrow from '../assets/select-arrow.svg';
import btnLeadingIcon from '../assets/btn-leading-icon.svg';

export default function Search() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchResults, categories, searchLoading, searchError } = useSelector(
    (state) => state.product
  );

  const initialKeyword = searchParams.get('keyword') || '';
  const initialCategory = searchParams.get('category') || '';

  const [keyword, setKeyword] = useState(initialKeyword);
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  useEffect(() => {
    dispatch(fetchCategoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    const kw = searchParams.get('keyword') || '';
    const cat = searchParams.get('category') || '';
    setKeyword(kw);
    setSelectedCategory(cat);

    if (cat) {
      dispatch(fetchProductsByCategoryThunk(cat));
    } else {
      dispatch(searchProductsThunk(kw));
    }
  }, [searchParams, dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = keyword.trim();
    setSelectedCategory('');
    if (trimmed) {
      setSearchParams({ keyword: trimmed });
    } else {
      setSearchParams({});
    }
  };

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    setSelectedCategory(catId);
    setKeyword('');
    if (catId) {
      setSearchParams({ category: catId });
    } else {
      setSearchParams({});
    }
  };

  const sortedProducts = useMemo(() => {
    if (!Array.isArray(searchResults)) return [];
    if (!sortOrder) return searchResults;
    return orderBy(searchResults, [(item) => Number(item.price)], [sortOrder]);
  }, [searchResults, sortOrder]);

  return (
    <div className="search-page" data-node-id="5722:508">
      <div className="container-1280">
        <form className="search-top-form" onSubmit={handleSearchSubmit}>
          <div className="figma-textfield search-input-group" data-node-id="5722:637">
            <label htmlFor="search-keyword-input" className="figma-label">
              Search
            </label>
            <input
              id="search-keyword-input"
              type="text"
              className="figma-input"
              placeholder="product name ...."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="figma-pill-btn search-submit-btn"
            data-node-id="5722:646"
          >
            <img src={btnLeadingIcon} alt="" />
            <span>SEARCH</span>
          </button>
        </form>
      </div>

      <div className="container-1280">
        <div className="gradient-banner search-result-banner" data-node-id="5722:659">
          <h1 className="gradient-banner-title" data-node-id="5722:660">
            Search result
          </h1>
        </div>
      </div>

      <div className="container-1280 search-results-body">
        <div className="search-filters-row">
          <div className="search-price-filter-group">
            <div className="figma-textfield" data-node-id="5722:661">
              <label htmlFor="price-sort-select" className="figma-label">
                Price
              </label>
              <div className="figma-select-wrapper">
                <select
                  id="price-sort-select"
                  className="figma-input figma-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="desc">decrease</option>
                  <option value="asc">ascending</option>
                </select>
                <span className="figma-select-arrow" data-node-id="5722:680">
                  <img src={selectArrow} alt="" />
                </span>
              </div>
            </div>

            <button
              type="button"
              className={`search-sub-option ${sortOrder === 'asc' ? 'active' : ''}`}
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              data-node-id="5722:670"
            >
              {sortOrder === 'desc' ? 'ascending' : 'decrease'}
            </button>
          </div>

          <div className="figma-textfield search-category-group">
            <label htmlFor="category-filter-select" className="figma-label">
              Category
            </label>
            <div className="figma-select-wrapper">
              <select
                id="category-filter-select"
                className="figma-input figma-select"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.category}
                  </option>
                ))}
              </select>
              <span className="figma-select-arrow">
                <img src={selectArrow} alt="" />
              </span>
            </div>
          </div>
        </div>

        {searchLoading && (
          <div className="status-box">Đang tìm kiếm sản phẩm...</div>
        )}

        {searchError && !searchLoading && (
          <div className="status-box error-text">{searchError}</div>
        )}

        {!searchLoading && !searchError && sortedProducts.length === 0 && (
          <div className="status-box">Không tìm thấy sản phẩm phù hợp.</div>
        )}

        {!searchLoading && !searchError && sortedProducts.length > 0 && (
          <div className="product-grid search-grid">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
