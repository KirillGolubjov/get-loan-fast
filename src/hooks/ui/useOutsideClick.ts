import { useEffect, useRef } from 'react';

interface Props {
  handler: () => void;
  listenCapturing?: boolean;
}

export function useOutsideClick({ handler, listenCapturing = true }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current?.contains(e.target as Node)) {
          handler();
        }
      }

      document.addEventListener('mousedown', handleClick, listenCapturing);

      return () =>
        document.removeEventListener('mousedown', handleClick, listenCapturing);
    },
    [handler, listenCapturing]
  );

  return ref;
}
