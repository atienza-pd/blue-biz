export const useCurrency = () => {
  return (value: number | undefined | null) => {
    if (!value) {
      return '';
    }
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
};
