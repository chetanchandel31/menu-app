import { useRef } from "react";

/** returns a higher order function which will run passed `callback` once execution stopped for `delayMs`
 *
 * usage:
 * ```tsx
 *  const debounce = useDebounce({
 *   delayMs: 1000,
 *  });
 *
 *  return <input onChange={(e) => debounce(() => console.log(e.target.value))} />
 * ```
 */
export default function useDebounce({ delayMs }: { delayMs: number }) {
  const timeoutIdRef = useRef<ReturnType<typeof setTimeout>>();

  const debounce = (callback: () => void) => {
    // clear timeout from previous call
    if (timeoutIdRef.current) clearTimeout(timeoutIdRef.current);

    // run this new one instead
    timeoutIdRef.current = setTimeout(callback, delayMs);
  };

  return debounce;
}
