import { pluginIndexHtml } from './plugin-island/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { pluginConfig } from './plugin-island/config';
import { pluginRoutes } from './plugin-routes';
import { SiteConfig } from 'shared/types';
import { createPluginMdx } from './plugin-mdx';

export async function createVitePlugins(
  config: SiteConfig,
  restartServer?: () => Promise<void>,
  isSSR = false,
  mdxHMR = false
) {
  return [
    await createPluginMdx(mdxHMR),
    pluginIndexHtml(),
    pluginReact({
      jsxRuntime: 'automatic',
      include: /\.(mdx|js|jsx|ts|tsx)$/
    }),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root,
      isSSR
    })
  ];
}
