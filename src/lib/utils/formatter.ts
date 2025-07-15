export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-TZ", {
    style: "currency",
    currency: "TZS",
    minimumFractionDigits: 0,
  }).format(amount);

export const formatDate = (dateStr?: string) => {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return "N/A";

  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const maskPhone = (phone: string): string => {
  if (!phone || phone.length < 5) return phone;
  const start = phone.slice(0, 2);
  const end = phone.slice(-3);
  return `${start}*****${end}`;
};
