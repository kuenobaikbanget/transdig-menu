import { useEffect, useState } from 'react';
import { formatPrice } from '../../utils/formatters';

const PaymentSuccess = ({ orderData, onBackToMenu }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Animate content entrance
    setTimeout(() => setShowContent(true), 100);
    
    // Add print styles to remove header/footer
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        @page { margin: 0; size: auto; }
        body { margin: 1.6cm; }
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const getPaymentMethodLogo = (method) => {
    const logos = {
      'qris': '/payment/QRIS.webp',
      'gopay': '/payment/GOPAY.webp',
      'ovo': '/payment/OVO.webp',
      'dana': '/payment/DANA.webp',
      'shopeepay': '/payment/SHOPEE_PAY.webp'
    };
    return logos[method] || '';
  };

  const getPaymentMethodName = (method) => {
    const names = {
      'qris': 'QRIS',
      'gopay': 'GoPay',
      'ovo': 'OVO',
      'dana': 'DANA',
      'shopeepay': 'ShopeePay'
    };
    return names[method] || method;
  };

  return (
    <div className={`payment-success-page ${showContent ? 'show' : ''}`}>
      <div className="payment-success-container">
        {/* Success Animation */}
        <div className="success-animation">
          <div className="success-checkmark">
            <svg 
              className="checkmark-check"
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 52 52"
            >
              <path 
                className="checkmark-check-path" 
                fill="none" 
                d="M14.1 27.2l7.1 7.2 16.7-16.8"
              />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <div className="success-header">
          <h1 className="success-title">Pembayaran Berhasil!</h1>
          <p className="success-subtitle">
            Terima kasih, pesanan Anda telah kami terima
          </p>
        </div>

        {/* Order Details Card */}
        <div className="success-details-card">
          {/* Customer Info */}
          <div className="success-info-section">
            <div className="success-info-row">
              <div className="success-info-content">
                <span className="success-info-label">Nama Pelanggan</span>
                <span className="success-info-value">{orderData.customerName}</span>
              </div>
            </div>

            {orderData.whatsappNumber && orderData.whatsappNumber !== '-' && (
              <div className="success-info-row">
                <div className="success-info-content">
                  <span className="success-info-label">No. WhatsApp</span>
                  <span className="success-info-value">{orderData.whatsappNumber}</span>
                </div>
              </div>
            )}

            <div className="success-info-row">
              <div className="success-info-content">
                <span className="success-info-label">Nomor Meja</span>
                <span className="success-info-value">Meja {orderData.tableNumber}</span>
              </div>
            </div>

            <div className="success-info-row">
              <div className="success-info-content">
                <span className="success-info-label">Metode Pembayaran</span>
                <div className="success-payment-method">
                  <img 
                    src={getPaymentMethodLogo(orderData.paymentMethod)} 
                    alt={getPaymentMethodName(orderData.paymentMethod)}
                    className="success-payment-logo"
                  />
                  <span className="success-info-value">
                    {getPaymentMethodName(orderData.paymentMethod)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="success-divider"></div>

          {/* Order Summary */}
          <div className="success-order-section">
            <h3 className="success-section-title">Ringkasan Pesanan</h3>
            <div className="success-order-list">
              {orderData.cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="success-order-item">
                  <div className="success-order-image">
                    {item.image.startsWith('/') ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      /* Fallback Icon if image is not a path (replaces emoji) */
                      <div className="success-placeholder-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                          <line x1="6" y1="1" x2="6" y2="4"></line>
                          <line x1="10" y1="1" x2="10" y2="4"></line>
                          <line x1="14" y1="1" x2="14" y2="4"></line>
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="success-order-details">
                    <span className="success-order-name">{item.name}</span>
                    <span className="success-order-qty">x{item.quantity}</span>
                  </div>
                  <span className="success-order-price">
                    {formatPrice(item.totalPrice)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Total */}
          <div className="success-total-section">
            <div className="success-total-row">
              <span className="success-total-label">Total Item</span>
              <span className="success-total-value">
                {orderData.cart.reduce((sum, item) => sum + item.quantity, 0)} item
              </span>
            </div>
            <div className="success-total-row success-grand-total">
              <span className="success-total-label">Total Pembayaran</span>
              <span className="success-total-amount">
                {formatPrice(orderData.totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Success Message Box */}
        <div className="success-message-box">
          <p className="success-message-text">
            Pesanan Anda sedang diproses oleh dapur kami. 
            Mohon menunggu, pesanan akan segera diantar ke meja Anda.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="success-actions">
          <button 
            className="success-back-btn"
            onClick={onBackToMenu}
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
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>Kembali ke Menu</span>
          </button>

          <button 
            className="success-print-btn"
            onClick={() => window.print()}
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
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
            <span>Cetak Struk</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;