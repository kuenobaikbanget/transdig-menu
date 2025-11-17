import { menuItems } from '../../data/menuItems';

const ResultsHeader = ({ 
  itemCount, 
  sortBy, 
  onSortChange, 
  hasActiveFilters, 
  onResetFilters 
}) => {
  return (
    <div className="results-header">
      <h2 className="results-title">Temukan Menu Wisangkopi</h2>
      <p className="results-subtitle">
        Pilihan kopi, minuman, dan makanan ringan yang dikurasi untuk menyesuaikan dengan selera dan suasana hati Anda.
      </p>
    </div>
  );
};

export default ResultsHeader;
