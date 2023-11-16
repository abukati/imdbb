export function validateObject<T>(obj: any): boolean {
  return typeof obj === 'object' && obj !== null && (obj satisfies T)
    ? true
    : false;
}
