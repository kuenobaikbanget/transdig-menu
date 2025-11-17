import { useState, useRef } from 'react';

export const useSearch = () => {
  const [showHeaderSearch, setShowHeaderSearch] = useState(false);
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const menuItemRefs = useRef({});

  const toggleHeaderSearch = () => {
    setShowHeaderSearch(prev => !prev);
    if (showHeaderSearch) {
      setHeaderSearchQuery('');
    }
  };

  const scrollToMenuItem = (itemId) => {
    setShowHeaderSearch(false);
    setHeaderSearchQuery('');
    
    setTimeout(() => {
      const element = menuItemRefs.current[itemId];
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        element.style.transition = 'all 0.3s ease';
        element.style.transform = 'scale(1.02)';
        element.style.boxShadow = '0 8px 30px rgba(139, 92, 246, 0.3)';
        
        setTimeout(() => {
          element.style.transform = 'scale(1)';
          element.style.boxShadow = '';
        }, 600);
      }
    }, 300);
  };

  return {
    showHeaderSearch,
    headerSearchQuery,
    setHeaderSearchQuery,
    toggleHeaderSearch,
    scrollToMenuItem,
    menuItemRefs,
  };
};
