export const formatPrice = (price: string | number) =>
  new Intl.NumberFormat("ru-RU").format(Number(price));
