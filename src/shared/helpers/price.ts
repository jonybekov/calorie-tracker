export const formatPrice = (price: string | number) =>
  new Intl.NumberFormat("ru-RU").format(Number(price));

export const normalizePrice = (price?: string | number) =>
  Number(String(price).replace(/\s/g, ""));
