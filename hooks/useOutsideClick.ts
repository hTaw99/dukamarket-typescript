import { useEffect, useRef } from "react";

export const useOutsideClick = (callback: () => void, state: boolean) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state) {
      const handleClickOutside = (event: MouseEvent) => {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          callback();
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [callback, state]);

  return ref;
};
