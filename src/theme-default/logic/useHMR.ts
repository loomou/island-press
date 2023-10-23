import { useState, useEffect } from 'react';

export function useHMR(initData, changeKey) {
  const [data, setData] = useState(initData);

  useEffect(() => {
    if (import.meta.env.DEV) {
      import.meta.hot.on(
        'mdx-changed',
        ({ filePath }: { filePath: string }) => {
          const pathName = new URL(filePath).pathname;
          import(/* @vite-ignore */ `${pathName}?import&t=${Date.now()}`).then(
            (module) => {
              setData(module[changeKey]);
            }
          );
        }
      );
    }
  });

  return data;
}
