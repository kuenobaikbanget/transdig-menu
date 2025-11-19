import { useState, useEffect } from 'react';

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
import AddToCartModal from './Cart/AddToCart';
import CartModal from './Cart/Cart';
import PaymentPage from './Payment/PaymentPage';
import OrderProcessing from './Payment/OrderProcessing';
import PaymentSuccess from './Successful/PaymentSuccess';

const MenuDashboard = () => {
  const [showPaymentPage, setShowPaymentPage] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [selectedTableNumber, setSelectedTableNumber] = useState('');
  const [orderData, setOrderData] = useState(null);

  // Custom hooks
  const cart = useCart();
  const filters = useFilters(menuItems);
  const search = useSearch();

  const handleCategoryChange = (category) => {
    filters.setActiveCategory(category);
  };

  const handleProceedToPayment = (tableNumber) => {
    setSelectedTableNumber(tableNumber);
    cart.closeCartModal();
    
    // Show loading animation
    setShowProcessing(true);
    
    // Simulate order processing (2 seconds)
    setTimeout(() => {
      setShowProcessing(false);
      setShowPaymentPage(true);
    }, 2000);
  };

  const handleBackFromPayment = () => {
    setShowPaymentPage(false);
    setShowProcessing(false);
    cart.openCartModal();
  };

  const handleConfirmPayment = (orderData) => {
    console.log('Order confirmed:', orderData);
    
    // Save order data
    setOrderData(orderData);
    
    // Hide payment page and show success page
    setShowPaymentPage(false);
    setShowPaymentSuccess(true);
  };

  const handleBackToMenu = () => {
    // Reset all states
    setShowPaymentSuccess(false);
    setShowPaymentPage(false);
    setShowProcessing(false);
    setSelectedTableNumber('');
    setOrderData(null);
    
    // Clear cart
    cart.cart.forEach(item => {
      cart.removeFromCart(item.id);
    });
  };

  // Show processing animation
  if (showProcessing) {
    return <OrderProcessing />;
  }

  // Show payment success page
  if (showPaymentSuccess && orderData) {
    return (
      <PaymentSuccess 
        orderData={orderData}
        onBackToMenu={handleBackToMenu}
      />
    );
  }

  // Show payment page if active
  if (showPaymentPage) {
    return (
      <PaymentPage 
        cart={cart.cart}
        tableNumber={selectedTableNumber}
        onBack={handleBackFromPayment}
        onConfirmPayment={handleConfirmPayment}
      />
    );
  }

  return (
    <div className="menu-dashboard">
      {/* Header */}
      <Header 
        onToggleSearch={search.toggleHeaderSearch}
        onToggleCart={cart.openCartModal}
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

      {/* Cart Modal */}
      <CartModal 
        isOpen={cart.showCartModal}
        onClose={cart.closeCartModal}
        cart={cart.cart}
        onRemoveItem={cart.removeFromCart}
        onUpdateQuantity={cart.updateCartItemQuantity}
        onProceedToPayment={handleProceedToPayment}
      />
    </div>
  );
};

export default MenuDashboard;
