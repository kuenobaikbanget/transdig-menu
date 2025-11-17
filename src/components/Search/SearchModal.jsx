import SearchResultItem from './SearchResultItem';

const SearchModal = ({ 
  isOpen, 
  onClose, 
  searchQuery, 
  onSearchChange, 
  items,
  onItemClick 
}) => {
  if (!isOpen) return null;

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <div className="search-modal-overlay" onClick={onClose}></div>
      
      <div className="search-modal">
        <div className="search-modal-header">
          <h2 className="search-modal-title">Cari</h2>
          <button 
            className="search-modal-close"
            onClick={onClose}
            title="Tutup"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="search-modal-input-wrapper">
          <input
            type="text"
            placeholder="Ketik untuk mencari..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="search-modal-input"
            autoFocus
          />
          <svg 
            className="search-modal-input-icon"
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
        </div>

        <div className="search-modal-content">
          {searchQuery === '' ? (
            <div className="search-modal-empty">
              <p>Silakan masukkan kata kunci untuk mulai mencari.</p>
            </div>
          ) : (
            <div className="search-modal-results">
              {filteredItems.length > 0 ? (
                filteredItems.map(item => (
                  <SearchResultItem 
                    key={item.id} 
                    item={item} 
                    onClick={onItemClick} 
                  />
                ))
              ) : (
                <div className="search-modal-empty">
                  <p>Tidak ada produk yang ditemukan.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchModal;
