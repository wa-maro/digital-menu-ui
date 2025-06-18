export const buildQuery = (params: Record<string, string | number>) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => query.set(key, String(val)));
  return `?${query.toString()}`;
};
