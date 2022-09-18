export const formatoMiles = (value: number): string => {
  return `${Math.trunc(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatDate = (value: string): string => {
  const date = value?.split("-");
  return `${date[2]}/${date[1]}/${date[0]}`;
};
