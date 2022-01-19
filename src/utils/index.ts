export const formatAddress = (address: string) => {
  const first8 = address.slice(0, 8);
  const last4 = address.slice(-4);
  return `${first8}...${last4}`;
};
