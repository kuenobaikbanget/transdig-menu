const PriceFilter = ({ 
  minPrice, 
  maxPrice, 
  onMinPriceChange, 
  onMaxPriceChange,
  onMinPriceInputChange,
  onMaxPriceInputChange,
  onMinPriceBlur,
  onMaxPriceBlur
}) => {
  return (
    <div className="filter-section">
      <h3 className="filter-title">Filter berdasarkan harga</h3>
      <p className="filter-description">
        Cari menu, makanan, atau item spesial favoritmu di sini.
      </p>
      <div className="price-slider">
        <div className="dual-range-slider">
          <input
            type="range"
            min="0"
            max="50000"
            step="100"
            value={minPrice}
            onChange={onMinPriceChange}
            className="slider slider-min"
          />
          <input
            type="range"
            min="0"
            max="50000"
            step="100"
            value={maxPrice}
            onChange={onMaxPriceChange}
            className="slider slider-max"
          />
          <div className="slider-track">
            <div 
              className="slider-range"
              style={{
                left: `${(minPrice / 50000) * 100}%`,
                right: `${100 - (maxPrice / 50000) * 100}%`
              }}
            ></div>
          </div>
        </div>
        <div className="price-range-cards">
          <div className="price-card">
            <div className="price-input-wrapper">
              <span className="currency-symbol">Rp</span>
              <input
                type="text"
                value={minPrice.toLocaleString('id-ID')}
                onChange={onMinPriceInputChange}
                onBlur={onMinPriceBlur}
                className="price-input"
                placeholder="0"
              />
            </div>
          </div>
          <div className="price-card">
            <div className="price-input-wrapper">
              <span className="currency-symbol">Rp</span>
              <input
                type="text"
                value={maxPrice.toLocaleString('id-ID')}
                onChange={onMaxPriceInputChange}
                onBlur={onMaxPriceBlur}
                className="price-input"
                placeholder="50000"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceFilter;
