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

export const formatRelativeDate = (createdAt: string) => {
  if (!createdAt) return "";

  const date = new Date(createdAt);
  const now = new Date();

  // Normalize time to midnight
  const oneDay = 1000 * 60 * 60 * 24;
  const diffTime = now.setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0);
  const diffDays = Math.floor(diffTime / oneDay);

  switch (true) {
    case diffDays === 0:
      return "Today";

    case diffDays === 1:
      return "Yesterday";

    case diffDays >= 2 && diffDays <= 7:
      return `${diffDays} days ago`;

    case diffDays >= 8 && diffDays <= 30:
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} week${weeks > 1 ? "s" : ""} ago`;

    case diffDays >= 61 && diffDays <= 365:
      const months = Math.floor(diffDays / 30);
      return `${months} month${months > 1 ? "s" : ""} ago`;

    default:
      const years = Math.floor(diffDays / 365);
      return `${years} year${years > 1 ? "s" : ""} ago`;
  }
};
