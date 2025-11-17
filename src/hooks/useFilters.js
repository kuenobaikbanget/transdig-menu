import { useState, useMemo } from 'react';

export const useFilters = (menuItems) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([15100, 34600]);
  const [minPrice, setMinPrice] = useState(15100);
  const [maxPrice, setMaxPrice] = useState(34600);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortBy, setSortBy] = useState('name-asc');

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(cat => cat !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const handleMinPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= maxPrice - 200) {
      setMinPrice(value);
      setPriceRange([value, maxPrice]);
    }
  };

  const handleMaxPriceChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= minPrice + 200) {
      setMaxPrice(value);
      setPriceRange([minPrice, value]);
    }
  };

  const handleMinPriceInputChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const numValue = parseInt(value) || 0;
    setMinPrice(numValue);
    if (numValue <= maxPrice - 200 && numValue <= 50000) {
      setPriceRange([numValue, maxPrice]);
    }
  };

  const handleMaxPriceInputChange = (e) => {
    const value = e.target.value.replace(/[^\d]/g, '');
    const numValue = parseInt(value) || 0;
    setMaxPrice(numValue);
    if (numValue >= minPrice + 200 && numValue <= 50000) {
      setPriceRange([minPrice, numValue]);
    }
  };

  const handleMinPriceBlur = () => {
    if (minPrice > maxPrice - 200) {
      setMinPrice(maxPrice - 200);
      setPriceRange([maxPrice - 200, maxPrice]);
    }
    if (minPrice > 50000) {
      setMinPrice(50000);
      setPriceRange([50000, maxPrice]);
    }
  };

  const handleMaxPriceBlur = () => {
    if (maxPrice < minPrice + 200) {
      setMaxPrice(minPrice + 200);
      setPriceRange([minPrice, minPrice + 200]);
    }
    if (maxPrice > 50000) {
      setMaxPrice(50000);
      setPriceRange([minPrice, 50000]);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setMinPrice(0);
    setMaxPrice(50000);
    setPriceRange([0, 50000]);
    setSelectedCategories([]);
    setActiveCategory('All');
    setSortBy('name-asc');
  };

  const hasActiveFilters = () => {
    return searchQuery !== '' || 
           minPrice !== 0 || 
           maxPrice !== 50000 || 
           activeCategory !== 'All' ||
           sortBy !== 'name-asc';
  };

  const filteredAndSortedItems = useMemo(() => {
    // Filter by category
    let items = activeCategory === 'All' 
      ? menuItems 
      : menuItems.filter(item => item.category === activeCategory);

    // Apply search filter
    items = items.filter(item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Apply price range filter
    items = items.filter(item =>
      item.price >= priceRange[0] && item.price <= priceRange[1]
    );

    // Apply category filter (from sidebar)
    if (selectedCategories.length > 0) {
      items = items.filter(item => 
        selectedCategories.some(cat => item.name.toLowerCase().includes(cat.toLowerCase()))
      );
    }

    // Apply sorting
    items = [...items].sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    return items;
  }, [menuItems, activeCategory, searchQuery, priceRange, selectedCategories, sortBy, minPrice, maxPrice]);

  return {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    priceRange,
    setPriceRange,
    minPrice,
    maxPrice,
    selectedCategories,
    sortBy,
    setSortBy,
    handleCategoryToggle,
    handleMinPriceChange,
    handleMaxPriceChange,
    handleMinPriceInputChange,
    handleMaxPriceInputChange,
    handleMinPriceBlur,
    handleMaxPriceBlur,
    handleResetFilters,
    hasActiveFilters,
    filteredAndSortedItems,
  };
};
