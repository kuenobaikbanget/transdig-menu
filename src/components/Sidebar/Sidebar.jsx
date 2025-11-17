import SearchFilter from './SearchFilter';
import PriceFilter from './PriceFilter';

const Sidebar = ({ filters }) => {
  return (
    <aside className="sidebar-filter">
      <div className="filter-header">
        <h3 className="filter-main-title">Filter Menu</h3>
      </div>

      <SearchFilter 
        searchQuery={filters.searchQuery}
        onSearchChange={filters.setSearchQuery}
      />

      <PriceFilter 
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        onMinPriceChange={filters.handleMinPriceChange}
        onMaxPriceChange={filters.handleMaxPriceChange}
        onMinPriceInputChange={filters.handleMinPriceInputChange}
        onMaxPriceInputChange={filters.handleMaxPriceInputChange}
        onMinPriceBlur={filters.handleMinPriceBlur}
        onMaxPriceBlur={filters.handleMaxPriceBlur}
      />
    </aside>
  );
};

export default Sidebar;
