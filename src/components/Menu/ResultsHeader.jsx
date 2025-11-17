import { menuItems } from '../../data/menuItems';

const ResultsHeader = ({ 
  itemCount, 
  sortBy, 
  onSortChange, 
  hasActiveFilters, 
  onResetFilters 
}) => {
  return (
    <div className="results-header">
      <h2 className="results-title">Temukan Menu Wisangkopi</h2>
      <p className="results-subtitle">
        Pilihan kopi, minuman, dan makanan ringan yang dikurasi dengan cermat untuk menyesuaikan dengan selera dan suasana hati Anda.
      </p>
      <div className="results-info">
        <span className="results-count">
          1 to {itemCount} of {menuItems.length} results
        </span>
        <div className="sort-dropdown">
          <label htmlFor="sort">Sort by:</label>
          <select 
            id="sort" 
            className="sort-select"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price (Low-High)</option>
            <option value="price-desc">Price (High-Low)</option>
          </select>
          
          {hasActiveFilters && (
            <button 
              className="reset-filter-btn"
              onClick={onResetFilters}
              title="Reset semua filter"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                <path d="M21 3v5h-5"></path>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                <path d="M3 21v-5h5"></path>
              </svg>
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsHeader;
