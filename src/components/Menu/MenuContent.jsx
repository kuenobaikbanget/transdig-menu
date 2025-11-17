import CategoryNav from './CategoryNav';
import ResultsHeader from './ResultsHeader';
import MenuCard from './MenuCard';

const MenuContent = ({ 
  filters, 
  cart, 
  menuItemRefs,
  onCategoryChange 
}) => {
  return (
    <div className="menu-content">
      <CategoryNav 
        activeCategory={filters.activeCategory}
        onCategoryChange={onCategoryChange}
      />

      <ResultsHeader 
        itemCount={filters.filteredAndSortedItems.length}
        sortBy={filters.sortBy}
        onSortChange={filters.setSortBy}
        hasActiveFilters={filters.hasActiveFilters()}
        onResetFilters={filters.handleResetFilters}
      />

      <div className="menu-grid">
        {filters.filteredAndSortedItems.length > 0 ? (
          filters.filteredAndSortedItems.map((item) => (
            <MenuCard 
              key={item.id}
              item={item}
              isInCart={cart.isItemInCart(item.id)}
              quantity={cart.getItemQuantityInCart(item.id)}
              onAddToCart={cart.openAddToCartModal}
              menuItemRef={(el) => menuItemRefs.current[item.id] = el}
            />
          ))
        ) : (
          <div className="no-results">
            <p>Tidak ada item yang cocok dengan filter Anda.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuContent;
