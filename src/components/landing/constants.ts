export const PHONE = "+51 994 068 553";
export const WA_NUMBER = "51994068553";
export const waLink = (text?: string) =>
  `https://wa.me/${WA_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
