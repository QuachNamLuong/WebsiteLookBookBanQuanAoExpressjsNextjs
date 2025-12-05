export function generateProductCodeHelper(nextNumber: number) {
  return `SP${String(nextNumber).padStart(6, "0")}`;
}