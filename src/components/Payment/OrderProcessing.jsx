const OrderProcessing = () => {
  return (
    <div className="order-processing-overlay">
      <div className="order-processing-container">
        <div className="order-processing-animation">
          {/* Coffee cup animation */}
          <div className="coffee-cup">
            <div className="coffee-cup-body">
              <div className="coffee-liquid"></div>
              <div className="coffee-steam">
                <div className="steam steam-1"></div>
                <div className="steam steam-2"></div>
                <div className="steam steam-3"></div>
              </div>
            </div>
            <div className="coffee-handle"></div>
          </div>
        </div>
        
        <div className="order-processing-text">
          <h2 className="processing-title">Memproses Pesanan...</h2>
          <p className="processing-subtitle">Mohon tunggu sebentar</p>
        </div>

        <div className="loading-dots">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
      </div>
    </div>
  );
};

export default OrderProcessing;
