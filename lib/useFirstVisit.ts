"use client";

import { useEffect, useState } from "react";

const KEY = "donut-drool-visited";

export function useFirstVisit(): boolean | null {
  const [isFirst, setIsFirst] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const visited = sessionStorage.getItem(KEY);
      if (!visited) {
        sessionStorage.setItem(KEY, "1");
        setIsFirst(true);
      } else {
        setIsFirst(false);
      }
    } catch {
      setIsFirst(true);
    }

    // Ctrl+Shift+R (or Cmd+Shift+R on Mac) clears the visit flag so the
    // intro animation replays on the upcoming reload.
    const onKeyDown = (e: KeyboardEvent) => {
      const hardReload =
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === "R" || e.key === "r");
      if (hardReload) {
        try {
          sessionStorage.removeItem(KEY);
        } catch {
          /* ignore */
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return isFirst;
}
