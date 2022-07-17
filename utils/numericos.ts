export const formatoMiles = (value: number): string => {
  return `${Math.trunc(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
