import { formatPrice } from '../../utils/formatters';

const MenuCard = ({ item, isInCart, quantity, onAddToCart, menuItemRef }) => {
  return (
    <div 
      className={`menu-card ${isInCart ? 'in-cart' : ''}`}
      ref={menuItemRef}
    >
      {isInCart && (
        <div className="in-cart-badge">
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
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
          <span>{quantity}x</span>
        </div>
      )}
      
      <div className="menu-card-image">
        {item.image.startsWith('/') ? (
          <img src={item.image} alt={item.name} className="menu-image" />
        ) : (
          <span className="image-placeholder">{item.image}</span>
        )}
      </div>
      
      <div className="menu-card-content">
        <h3 className="menu-item-name">{item.name}</h3>
        <p className="menu-item-description">{item.description}</p>
        <p className="menu-item-price">{formatPrice(item.price)}</p>

        <button 
          className={`add-to-cart-btn ${isInCart ? 'item-in-cart' : ''}`}
          onClick={() => onAddToCart(item)}
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
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span>{isInCart ? 'Tambah lagi' : 'Tambah ke keranjang'}</span>
        </button>
      </div>
    </div>
  );
};

export default MenuCard;
