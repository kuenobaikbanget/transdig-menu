export const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

export const formatRupiah = (value) => {
  return `Rp ${value.toLocaleString('id-ID')}`;
};
