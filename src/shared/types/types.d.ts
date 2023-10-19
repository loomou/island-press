/// <reference types="vite/client" />

declare module 'island:site-data' {
  import type { UserConfig } from 'shared/types';
  const siteData: UserConfig;
  export default siteData;
}

declare module 'island:routes' {
  import { RouteObject } from 'react-router-dom';
  import { PageModule } from 'shared/types';

  type NewRouteObject = RouteObject & {
    path: string;
    element: React.ReactElement;
    filePath: string;
    preload: () => Promise<PageModule>;
  }

  export const routes: NewRouteObject[];
}
