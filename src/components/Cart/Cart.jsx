import { useState } from 'react';
import { formatPrice } from '../../utils/formatters';

const CartModal = ({ isOpen, onClose, cart, onRemoveItem, onUpdateQuantity, onProceedToPayment }) => {
  const [tableNumber, setTableNumber] = useState('');
  
  // Generate table numbers (1-20 as example, adjust as needed)
  const tableNumbers = Array.from({ length: 20 }, (_, i) => i + 1);
  
  if (!isOpen) return null;

  const calculateGrandTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleProceedToPayment = () => {
    if (!tableNumber) {
      alert('Mohon pilih nomor meja terlebih dahulu');
      return;
    }
    onProceedToPayment(tableNumber);
  };

  return (
    <>
      {/* Overlay */}
      <div className="cart-modal-overlay" onClick={onClose}></div>
      
      {/* Modal */}
      <div className="cart-modal cart-view-modal">
        <div className="cart-modal-header">
          <h2 className="cart-modal-title">Keranjang Pesanan</h2>
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
          {cart.length === 0 ? (
            <div className="cart-empty">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="80" 
                height="80" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <p className="cart-empty-text">Keranjang Anda kosong</p>
              <p className="cart-empty-subtext">Silakan tambahkan menu untuk melanjutkan pesanan</p>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="cart-item">
                  <div className="cart-item-image">
                    {item.image.startsWith('/') ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <span>{item.image}</span>
                    )}
                  </div>
                  
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <h3 className="cart-item-name">{item.name}</h3>
                      <button 
                        className="cart-item-remove"
                        onClick={() => onRemoveItem(index)}
                        title="Hapus item"
                      >
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          width="18" 
                          height="18" 
                          viewBox="0 0 24 24" 
                          fill="none" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          <line x1="10" y1="11" x2="10" y2="17"></line>
                          <line x1="14" y1="11" x2="14" y2="17"></line>
                        </svg>
                      </button>
                    </div>
                    
                    <div className="cart-item-info">
                      <div className="cart-item-quantity-control">
                        <span className="cart-item-quantity-label">Jumlah:</span>
                        <div className="cart-quantity-controls">
                          <button 
                            className="cart-quantity-btn"
                            onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                            disabled={item.quantity <= 1}
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
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                          <span className="cart-quantity-value">{item.quantity}</span>
                          <button 
                            className="cart-quantity-btn"
                            onClick={() => onUpdateQuantity(index, item.quantity + 1)}
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
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                      {item.sugarLevel && item.sugarLevel !== 'N/A' && (
                        <p className="cart-item-sugar">Gula: {item.sugarLevel}%</p>
                      )}
                    </div>
                    
                    {item.additionalOptions.length > 0 && (
                      <div className="cart-item-additionals">
                        <p className="cart-item-additionals-label">Tambahan:</p>
                        <ul className="cart-item-additionals-list">
                          {item.additionalOptions.map(add => (
                            <li key={add.id}>
                              {add.name} (+{formatPrice(add.price)})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {item.notes && (
                      <div className="cart-item-notes">
                        <p className="cart-item-notes-label">Catatan:</p>
                        <p className="cart-item-notes-text">{item.notes}</p>
                      </div>
                    )}
                    
                    <div className="cart-item-price">
                      <span className="cart-item-price-label">Total:</span>
                      <span className="cart-item-price-value">{formatPrice(item.totalPrice)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-modal-footer">
            <div className="table-number-section">
              <label htmlFor="table-number" className="table-number-label">
                <span>Nomor Meja</span>
              </label>
              <select
                id="table-number"
                className="table-number-select"
                value={tableNumber}
                onChange={(e) => setTableNumber(e.target.value)}
              >
                <option value="">Pilih nomor meja...</option>
                {tableNumbers.map(num => (
                  <option key={num} value={num}>
                    Meja {num}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="cart-summary">
              <div className="cart-summary-row">
                <span>Total Item:</span>
                <span>{getTotalQuantity()} item</span>
              </div>
              <div className="cart-summary-row cart-summary-total">
                <span>Total Pembayaran:</span>
                <span className="cart-summary-price">{formatPrice(calculateGrandTotal())}</span>
              </div>
            </div>
            <button 
              className="cart-checkout-btn"
              onClick={handleProceedToPayment}
              disabled={!tableNumber}
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
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
              <span>Lanjut ke Pembayaran</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartModal;
