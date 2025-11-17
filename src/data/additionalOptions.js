// Additional options untuk Coffee & Non-Coffee
export const beverageAdditionalOptions = [
  { id: 'extra-shot', name: 'Extra Espresso Shot', price: 5000 },
  { id: 'whipped-cream', name: 'Whipped Cream', price: 3000 },
  { id: 'caramel-drizzle', name: 'Caramel Drizzle', price: 3000 },
  { id: 'chocolate-sauce', name: 'Chocolate Sauce', price: 3000 },
  { id: 'vanilla-syrup', name: 'Vanilla Syrup', price: 4000 },
  { id: 'hazelnut-syrup', name: 'Hazelnut Syrup', price: 4000 },
];

// Coffee Beans options untuk Manual Brew (pilihan wajib, single choice)
export const coffeeBeans = [
  { id: 'java-frinsa', name: 'Java Frinsa', price: 0 },
  { id: 'ethiopia', name: 'Ethiopia', price: 8000 },
  { id: 'colombia', name: 'Colombia', price: 14000 },
];

// Additional options untuk Ramen
export const ramenAdditionalOptions = [
  { id: 'extra-noodles', name: 'Extra Noodles', price: 13000 },
  { id: 'extra-egg', name: 'Extra Egg', price: 5000 },
  { id: 'extra-vegetables', name: 'Extra Vegetables', price: 4000 },
];

// Additional options untuk Rice Bowl
export const riceBowlAdditionalOptions = [
  { id: 'extra-rice', name: 'Extra Rice', price: 6000 },
  { id: 'extra-egg-rice', name: 'Extra Egg', price: 5000 },
  { id: 'extra-sauce', name: 'Extra Sauce', price: 2000 },
];

// Additional options untuk Snack
export const snackAdditionalOptions = [
  { id: 'extra-sauce-snack', name: 'Extra Sauce', price: 2000 },
  { id: 'spicy-mayo', name: 'Spicy Mayo', price: 4000 },
  { id: 'cheese-sauce', name: 'Cheese Sauce', price: 6000 },
];

// Backward compatibility - keep original export
export const additionalOptions = beverageAdditionalOptions;

// Helper function to get additional options by category or item name
export const getAdditionalOptionsByCategory = (category, itemName = '') => {
  // Special case for Manual Brew
  if (itemName === 'Manual Brew') {
    return coffeeBeans;
  }

  if (itemName === 'Japanese Iced Coffee') {
    return coffeeBeans;
  }
  
  switch (category) {
    case 'Coffee':
    case 'Non-Coffee':
      return beverageAdditionalOptions;
    case 'Ramen':
      return ramenAdditionalOptions;
    case 'Rice Bowl':
      return riceBowlAdditionalOptions;
    case 'Snack':
      return snackAdditionalOptions;
    default:
      return [];
  }
};

// Categories that don't need sugar level
export const categoriesWithoutSugarLevel = ['Ramen', 'Rice Bowl', 'Snack'];

// Items that don't need sugar level (specific items)
export const itemsWithoutSugarLevel = ['Manual Brew', 'Japanese Iced Coffee'];

// Helper function to check if category/item needs sugar level
export const categoryNeedsSugarLevel = (category, itemName = '') => {
  // Check if specific item doesn't need sugar level
  if (itemsWithoutSugarLevel.includes(itemName)) {
    return false;
  }
  return !categoriesWithoutSugarLevel.includes(category);
};

export const sugarLevels = [
  { value: '0', label: '0%' },
  { value: '25', label: '25%' },
  { value: '50', label: '50%' },
  { value: '75', label: '75%' },
  { value: '100', label: '100%' },
];
