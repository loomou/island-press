import { useState, useEffect } from 'react';
import { Header } from 'shared/types';

export function useHeaders(initHeaders: Header[]) {
  const [headers, setHeaders] = useState(initHeaders);

  useEffect(() => {
    console.log(import.meta);
    if (import.meta.env.DEV) {
      import.meta.hot.on(
        'mdx-changed:toc',
        ({ filePath }: { filePath: string }) => {
          const pathName = new URL(filePath).pathname;
          import(/* @vite-ignore */ `${pathName}?import&t=${Date.now()}`).then(
            (module) => {
              setHeaders(module.toc);
            }
          );
        }
      );
    }
  });
  return headers;
}
