import { categories } from '../../data/categories';

const CategoryNav = ({ activeCategory, onCategoryChange }) => {
  return (
    <div className="category-nav-inline">
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
