import { formatRupiah } from '../../utils/formatters';

const SearchResultItem = ({ item, onClick }) => {
  return (
    <div className="search-result-item" onClick={() => onClick(item.id)}>
      <div className="search-result-icon">{item.image}</div>
      <div className="search-result-info">
        <h4 className="search-result-name">{item.name}</h4>
        <p className="search-result-description">{item.description}</p>
        <p className="search-result-price">{formatRupiah(item.price)}</p>
      </div>
    </div>
  );
};

export default SearchResultItem;
