import { useState } from 'react';
import { formatPrice } from '../../utils/formatters';
import { 
  getAdditionalOptionsByCategory, 
  categoryNeedsSugarLevel,
  sugarLevels 
} from '../../data/additionalOptions';

const AddToCartModal = ({ 
  isOpen, 
  onClose, 
  selectedItem, 
  sugarLevel, 
  setSugarLevel,
  selectedAdditionals,
  toggleAdditional,
  itemNotes,
  setItemNotes,
  onAddToCart
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !selectedItem) return null;

  // Get additional options based on item category and name
  const availableAdditionals = getAdditionalOptionsByCategory(selectedItem.category, selectedItem.name);
  const showSugarLevel = categoryNeedsSugarLevel(selectedItem.category, selectedItem.name);
  
  // Check if this is Manual Brew (requires bean selection, single choice)
  const isManualBrew = selectedItem.name === 'Manual Brew';

  const calculateTotalPrice = () => {
    let total = selectedItem.price;
    
    selectedAdditionals.forEach(additionalId => {
      const additional = availableAdditionals.find(opt => opt.id === additionalId);
      if (additional) {
        total += additional.price;
      }
    });
    
    return total * quantity;
  };

  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: selectedItem.id,
      name: selectedItem.name,
      price: selectedItem.price,
      image: selectedItem.image,
      quantity: quantity,
      sugarLevel: showSugarLevel ? sugarLevel : 'N/A',
      additionalOptions: selectedAdditionals.map(id => {
        const option = availableAdditionals.find(opt => opt.id === id);
        return { id: option.id, name: option.name, price: option.price };
      }),
      notes: itemNotes,
      totalPrice: calculateTotalPrice()
    };
    
    onAddToCart(cartItem);
    setQuantity(1); // Reset quantity after adding to cart
  };

  return (
    <>
      {/* Overlay */}
      <div className="cart-modal-overlay" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="cart-modal">
        <div className="cart-modal-header">
          <h2 className="cart-modal-title">Tambah ke Keranjang</h2>
          <button 
            className="cart-modal-close"
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

        <div className="cart-modal-content">
          {/* Item Info */}
          <div className="cart-modal-item-info">
            <div className="cart-modal-item-icon">
              {selectedItem.image.startsWith('/') ? (
                <img src={selectedItem.image} alt={selectedItem.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '12px' }} />
              ) : (
                selectedItem.image
              )}
            </div>
            <div>
              <h3 className="cart-modal-item-name">{selectedItem.name}</h3>
              <p className="cart-modal-item-description">{selectedItem.description}</p>
              <p className="cart-modal-item-price">{formatPrice(selectedItem.price)}</p>
            </div>
          </div>

          {/* Sugar Level - Only show for beverages */}
          {showSugarLevel && (
            <div className="cart-modal-section">
              <h4 className="cart-modal-section-title">Sugar Level</h4>
              <div className="sugar-level-options">
                {sugarLevels.map(level => (
                  <button
                    key={level.value}
                    className={`sugar-level-btn ${sugarLevel === level.value ? 'active' : ''}`}
                    onClick={() => setSugarLevel(level.value)}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Bean Selection for Manual Brew or Additional Options for others */}
          {availableAdditionals.length > 0 && (
            <div className="cart-modal-section">
              <h4 className="cart-modal-section-title">
                {isManualBrew ? 'Pilih Beans (Wajib)' : 'Additional'}
              </h4>
              <div className="additional-options">
                {availableAdditionals.map(option => (
                  <label key={option.id} className="additional-option">
                    <input
                      type={isManualBrew ? 'radio' : 'checkbox'}
                      name={isManualBrew ? 'coffee-bean' : undefined}
                      checked={selectedAdditionals.includes(option.id)}
                      onChange={() => toggleAdditional(option.id, isManualBrew)}
                    />
                    <span className="additional-name">{option.name}</span>
                    <span className="additional-price">
                      {option.price === 0 ? 'Default' : `+${formatPrice(option.price)}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="cart-modal-section">
            <h4 className="cart-modal-section-title">Notes</h4>
            <textarea
              className="cart-modal-notes"
              placeholder="Tambahkan catatan khusus untuk pesanan Anda..."
              value={itemNotes}
              onChange={(e) => setItemNotes(e.target.value)}
              rows="3"
            />
          </div>

          {/* Quantity */}
          <div className="cart-modal-section">
            <div className="quantity-control">
              <button 
                className="quantity-btn"
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
              >
                <svg 
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
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
              <input 
                type="number" 
                className="quantity-input"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
              <button 
                className="quantity-btn"
                onClick={handleIncreaseQuantity}
              >
                <svg 
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
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="cart-modal-footer">
          <div className="cart-modal-total">
            <span>Total:</span>
            <span className="cart-modal-total-price">{formatPrice(calculateTotalPrice())}</span>
          </div>
          <button 
            className="cart-modal-add-btn"
            onClick={handleAddToCart}
          >
            <svg 
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
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Tambah ke Keranjang</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default AddToCartModal;
