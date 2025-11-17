const SearchFilter = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="filter-section">
      <h3 className="filter-title">Cari di menu kami</h3>
      <p className="filter-description">
        Cari menu, makanan, atau item spesial favoritmu di sini.
      </p>
      <div className="search-box">
        <svg 
          className="search-icon"
          xmlns="http://www.w3.org/2000/svg" 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          type="text"
          placeholder="Cari menu..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
