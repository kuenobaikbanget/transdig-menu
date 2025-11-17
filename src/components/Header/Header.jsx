import SearchButton from './SearchButton';
import CartButton from './CartButton';

const Header = ({ onToggleSearch, onToggleCart, totalItems }) => {
  return (
    <header className="menu-header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-text">WISANGKOPI</span>
        </div>

        <div className="header-right">
          <div className="header-actions">
            <SearchButton onClick={onToggleSearch} />
          </div>

          <CartButton totalItems={totalItems} onClick={onToggleCart} />
        </div>
      </div>
    </header>
  );
};

export default Header;
