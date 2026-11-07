/**
 * Utility to execute async operations with a strict timeout.
 * Supports both a Promise directly or a factory function (() => Promise<T>).
 * Prevents Netlify Serverless Functions / OpenNext from hanging indefinitely
 * when external storage APIs or Blobs ambient contexts are unlinked.
 */
export async function withTimeout<T>(
  operation: Promise<T> | (() => Promise<T>),
  timeoutMs: number,
  fallbackValue: T
): Promise<T> {
  let timer: NodeJS.Timeout | null = null;

  const timeoutPromise = new Promise<T>((resolve) => {
    timer = setTimeout(() => {
      resolve(fallbackValue);
    }, timeoutMs);
  });

  try {
    const promise = typeof operation === "function" ? operation() : operation;
    const result = await Promise.race([promise, timeoutPromise]);
    if (timer) clearTimeout(timer);
    return result;
  } catch {
    if (timer) clearTimeout(timer);
    return fallbackValue;
  }
}
