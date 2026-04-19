import { useEffect } from "react";

export function useLockBodyScroll(active: boolean): void {
  useEffect(() => {
    const { body } = document;
    if (!active) {
      return;
    }

    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [active]);
}
