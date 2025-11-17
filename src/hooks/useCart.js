import { useState } from 'react';

export const useCart = () => {
  const [cart, setCart] = useState([]);
  const [showAddToCartModal, setShowAddToCartModal] = useState(false);
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

  const addToCart = (newItem) => {
    setCart([...cart, newItem]);
    closeAddToCartModal();
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
    selectedItem,
    sugarLevel,
    selectedAdditionals,
    itemNotes,
    setSugarLevel,
    setItemNotes,
    openAddToCartModal,
    closeAddToCartModal,
    toggleAdditional,
    addToCart,
    getTotalItems,
    isItemInCart,
    getItemQuantityInCart,
  };
};
