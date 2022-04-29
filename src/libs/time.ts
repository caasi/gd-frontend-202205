export const delay
  : <T>(ms: number) => (value: T) => Promise<T>
  = (ms) => (value) =>
    new Promise(resolve => setTimeout(resolve, ms, value));
