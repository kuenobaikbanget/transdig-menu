import '../styles/MenuDashboard.css';

// Import data
import { menuItems } from '../data/menuItems';

// Import hooks
import { useCart } from '../hooks/useCart';
import { useFilters } from '../hooks/useFilters';
import { useSearch } from '../hooks/useSearch';

// Import components
import Header from './Header/Header';
import SearchModal from './Search/SearchModal';
import Sidebar from './Sidebar/Sidebar';
import MenuContent from './Menu/MenuContent';
import AddToCartModal from './Cart/AddToCartModal';

const MenuDashboard = () => {
  // Custom hooks
  const cart = useCart();
  const filters = useFilters(menuItems);
  const search = useSearch();

  const handleCategoryChange = (category) => {
    filters.setActiveCategory(category);
  };

  return (
    <div className="menu-dashboard">
      {/* Header */}
      <Header 
        onToggleSearch={search.toggleHeaderSearch}
        totalItems={cart.getTotalItems()}
      />

      {/* Header Search Modal */}
      <SearchModal 
        isOpen={search.showHeaderSearch}
        onClose={search.toggleHeaderSearch}
        searchQuery={search.headerSearchQuery}
        onSearchChange={search.setHeaderSearchQuery}
        items={menuItems}
        onItemClick={search.scrollToMenuItem}
      />

      {/* Main Content with Sidebar */}
      <div className="main-content">
        {/* Sidebar Filter */}
        <Sidebar filters={filters} />

        {/* Main Menu Content */}
        <MenuContent 
          filters={filters}
          cart={cart}
          menuItemRefs={search.menuItemRefs}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {/* Add to Cart Modal */}
      <AddToCartModal 
        isOpen={cart.showAddToCartModal}
        onClose={cart.closeAddToCartModal}
        selectedItem={cart.selectedItem}
        sugarLevel={cart.sugarLevel}
        setSugarLevel={cart.setSugarLevel}
        selectedAdditionals={cart.selectedAdditionals}
        toggleAdditional={cart.toggleAdditional}
        itemNotes={cart.itemNotes}
        setItemNotes={cart.setItemNotes}
        onAddToCart={cart.addToCart}
      />
    </div>
  );
};

export default MenuDashboard;
