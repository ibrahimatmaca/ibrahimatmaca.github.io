import { useEffect } from 'react';

const DEFAULT_TITLE = 'İbrahim Atmaca | Senior Mobile Engineer';

export function usePageTitle(title: string): void {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    return () => {
      document.title = previousTitle;
    };
  }, [title]);
}

export { DEFAULT_TITLE };
