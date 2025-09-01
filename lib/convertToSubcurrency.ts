function convertToSubcurrency(amount: number, factor: 100): number {
  // For simplicity, we assume 2 decimal places for all currencies.
  // In a real-world scenario, you might want to handle different currencies differently.
  return Math.round(amount * factor);
}
export default convertToSubcurrency;
