import { useState } from 'react';
import { formatPrice } from '../../utils/formatters';

const PaymentPage = ({ 
  cart, 
  tableNumber, 
  onBack, 
  onConfirmPayment 
}) => {
  const [customerName, setCustomerName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');

  const calculateGrandTotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleConfirmPayment = () => {
    if (!customerName || !paymentMethod) {
      alert('Mohon lengkapi nama dan metode pembayaran');
      return;
    }

    const orderData = {
      customerName,
      whatsappNumber: whatsappNumber || '-',
      tableNumber,
      cart,
      paymentMethod,
      totalAmount: calculateGrandTotal(),
      orderDate: new Date().toISOString()
    };

    onConfirmPayment(orderData);
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        {/* Header */}
        <div className="payment-header">
          <button className="payment-back-btn" onClick={onBack}>
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
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Kembali</span>
          </button>
          <h1 className="payment-title">Pembayaran</h1>
        </div>

        <div className="payment-content">
          {/* Customer Information Section */}
          <div className="payment-section">
            <h2 className="payment-section-title">Informasi Pelanggan</h2>
            
            <div className="payment-form-group">
              <label htmlFor="customer-name" className="payment-label required">
                Nama Pelanggan
              </label>
              <input
                id="customer-name"
                type="text"
                className="payment-input"
                placeholder="Masukkan nama Anda..."
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>

            <div className="payment-form-group">
              <label htmlFor="whatsapp-number" className="payment-label">
                No. WhatsApp <span className="optional-label">(Opsional)</span>
              </label>
              <input
                id="whatsapp-number"
                type="tel"
                className="payment-input"
                placeholder="Contoh: 08123456789"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
              />
            </div>

            <div className="payment-info-row">
              <span className="payment-info-label">Nomor Meja:</span>
              <span className="payment-info-value">Meja {tableNumber}</span>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="payment-section">
            <h2 className="payment-section-title">Ringkasan Pesanan</h2>
            
            <div className="payment-order-list">
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="payment-order-item">
                  <div className="payment-order-image">
                    {item.image.startsWith('/') ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <span>{item.image}</span>
                    )}
                  </div>
                  <div className="payment-order-details">
                    <h3 className="payment-order-name">{item.name}</h3>
                    <p className="payment-order-quantity">Qty: {item.quantity}</p>
                    {item.sugarLevel && item.sugarLevel !== 'N/A' && (
                      <p className="payment-order-info">Gula: {item.sugarLevel}%</p>
                    )}
                    {item.additionalOptions.length > 0 && (
                      <div className="payment-order-additionals">
                        {item.additionalOptions.map(add => (
                          <span key={add.id} className="payment-order-addon">
                            + {add.name}
                          </span>
                        ))}
                      </div>
                    )}
                    {item.notes && (
                      <p className="payment-order-notes">Note: {item.notes}</p>
                    )}
                  </div>
                  <div className="payment-order-price">
                    {formatPrice(item.totalPrice)}
                  </div>
                </div>
              ))}
            </div>

            <div className="payment-summary">
              <div className="payment-summary-row">
                <span>Total Item:</span>
                <span>{getTotalQuantity()} item</span>
              </div>
              <div className="payment-summary-row payment-summary-total">
                <span>Total Pembayaran:</span>
                <span className="payment-summary-price">{formatPrice(calculateGrandTotal())}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Section */}
          <div className="payment-section">
            <h2 className="payment-section-title">Metode Pembayaran</h2>
            
            <div className="payment-methods">
              {/* QRIS */}
              <label className="payment-method-option">
                <input
                  type="radio"
                  name="payment-method"
                  value="qris"
                  checked={paymentMethod === 'qris'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="payment-method-content">
                  <div className="payment-method-logo">
                    <img src="/payment/QRIS.webp" alt="QRIS" />
                  </div>
                  <div className="payment-method-info">
                    <span className="payment-method-name">QRIS</span>
                    <span className="payment-method-desc">Semua e-wallet & mobile banking</span>
                  </div>
                </div>
              </label>

              {/* GoPay */}
              <label className="payment-method-option">
                <input
                  type="radio"
                  name="payment-method"
                  value="gopay"
                  checked={paymentMethod === 'gopay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="payment-method-content">
                  <div className="payment-method-logo">
                    <img src="/payment/GOPAY.webp" alt="GoPay" />
                  </div>
                  <div className="payment-method-info">
                    <span className="payment-method-name">GoPay</span>
                    <span className="payment-method-desc">Bayar pakai saldo GoPay</span>
                  </div>
                </div>
              </label>

              {/* OVO */}
              <label className="payment-method-option">
                <input
                  type="radio"
                  name="payment-method"
                  value="ovo"
                  checked={paymentMethod === 'ovo'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="payment-method-content">
                  <div className="payment-method-logo">
                    <img src="/payment/OVO.webp" alt="OVO" />
                  </div>
                  <div className="payment-method-info">
                    <span className="payment-method-name">OVO</span>
                    <span className="payment-method-desc">Bayar pakai saldo OVO</span>
                  </div>
                </div>
              </label>

              {/* DANA */}
              <label className="payment-method-option">
                <input
                  type="radio"
                  name="payment-method"
                  value="dana"
                  checked={paymentMethod === 'dana'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="payment-method-content">
                  <div className="payment-method-logo">
                    <img src="/payment/DANA.webp" alt="DANA" />
                  </div>
                  <div className="payment-method-info">
                    <span className="payment-method-name">DANA</span>
                    <span className="payment-method-desc">Bayar pakai saldo DANA</span>
                  </div>
                </div>
              </label>

              {/* ShopeePay */}
              <label className="payment-method-option">
                <input
                  type="radio"
                  name="payment-method"
                  value="shopeepay"
                  checked={paymentMethod === 'shopeepay'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <div className="payment-method-content">
                  <div className="payment-method-logo">
                    <img src="/payment/SHOPEE_PAY.webp" alt="ShopeePay" />
                  </div>
                  <div className="payment-method-info">
                    <span className="payment-method-name">ShopeePay</span>
                    <span className="payment-method-desc">Bayar pakai saldo ShopeePay</span>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="payment-footer">
          <div className="payment-total-info">
            <span className="payment-total-label">Total Pembayaran:</span>
            <span className="payment-total-amount">{formatPrice(calculateGrandTotal())}</span>
          </div>
          <button 
            className="payment-confirm-btn"
            onClick={handleConfirmPayment}
            disabled={!customerName || !paymentMethod}
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
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>Konfirmasi Pembayaran</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
