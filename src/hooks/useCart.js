import { useState } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sugarLevel, setSugarLevel] = useState('100');
  const [selectedAdditionals, setSelectedAdditionals] = useState([]);
  const [itemNotes, setItemNotes] = useState('');

  const openAddToCartModal = (item) => {
    setSelectedItem(item);
    setSugarLevel('100');
    setSelectedAdditionals([]);
    setItemNotes('');
    setShowAddToCartModal(true);
  };

  const closeAddToCartModal = () => {
    setShowAddToCartModal(false);
    setSelectedItem(null);
    setSugarLevel('100');
    setSelectedAdditionals([]);
    setItemNotes('');
  };

  const toggleAdditional = (additionalId) => {
    setSelectedAdditionals(prev => {
      if (prev.includes(additionalId)) {
        return prev.filter(id => id !== additionalId);
      } else {
        return [...prev, additionalId];
      }
    });
  };

  // Helper function to check if two items are the same
  const isSameCartItem = (cartItem, newItem) => {
    // Check if basic properties match
    if (cartItem.id !== newItem.id || cartItem.sugarLevel !== newItem.sugarLevel) {
      return false;
    }

    // Check if notes match
    if (cartItem.notes !== newItem.notes) {
      return false;
    }

    // Check if additional options match
    if (cartItem.additionalOptions.length !== newItem.additionalOptions.length) {
      return false;
    }

    // Check if all additional options are the same
    const cartAdditionalIds = cartItem.additionalOptions.map(opt => opt.id).sort();
    const newAdditionalIds = newItem.additionalOptions.map(opt => opt.id).sort();
    
    return cartAdditionalIds.every((id, index) => id === newAdditionalIds[index]);
  };

  const addToCart = (newItem) => {
    setCart(prevCart => {
      // Find if the same item configuration already exists in cart
      const existingItemIndex = prevCart.findIndex(cartItem => isSameCartItem(cartItem, newItem));

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingItemIndex];
        
        // Calculate base price per unit
        const basePrice = existingItem.price;
        const additionalsPrice = existingItem.additionalOptions.reduce((sum, add) => sum + add.price, 0);
        const pricePerUnit = basePrice + additionalsPrice;
        
        // Update with new quantity
        const newQuantity = existingItem.quantity + newItem.quantity;
        updatedCart[existingItemIndex] = {
          ...existingItem,
          quantity: newQuantity,
          totalPrice: pricePerUnit * newQuantity
        };
        
        return updatedCart;
      } else {
        // Item doesn't exist, add as new
        return [...prevCart, newItem];
      }
    });
    
    closeAddToCartModal();
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateCartItemQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity less than 1
    
    setCart(prevCart => {
      const updatedCart = [...prevCart];
      const item = updatedCart[index];
      
      // Calculate base price (item price + additionals)
      const basePrice = item.price;
      const additionalsPrice = item.additionalOptions.reduce((sum, add) => sum + add.price, 0);
      const pricePerUnit = basePrice + additionalsPrice;
      
      // Update quantity and total price
      updatedCart[index] = {
        ...item,
        quantity: newQuantity,
        totalPrice: pricePerUnit * newQuantity
      };
      
      return updatedCart;
    });
  };

  const openCartModal = () => {
    setShowCartModal(true);
  };

  const closeCartModal = () => {
    setShowCartModal(false);
  };

  const getTotalItems = () => {
    return cart.length;
  };

  const isItemInCart = (itemId) => {
    return cart.some(cartItem => cartItem.id === itemId);
  };

  const getItemQuantityInCart = (itemId) => {
    return cart.filter(cartItem => cartItem.id === itemId).length;
  };

  return {
    cart,
    showAddToCartModal,
    showCartModal,
    selectedItem,
    sugarLevel,
    selectedAdditionals,
    itemNotes,
    setSugarLevel,
    setItemNotes,
    openAddToCartModal,
    closeAddToCartModal,
    openCartModal,
    closeCartModal,
    toggleAdditional,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    getTotalItems,
    isItemInCart,
    getItemQuantityInCart,
  };
};
