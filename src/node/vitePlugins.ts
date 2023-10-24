import { pluginIndexHtml } from './plugin-island/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { pluginConfig } from './plugin-island/config';
import { pluginRoutes } from './plugin-routes';
import { SiteConfig } from 'shared/types';
import { createPluginMdx } from './plugin-mdx';
import pluginUnocss from 'unocss/vite';
import unocssOptions from './unocssOptions';
import { pluginMdxHMR } from './plugin-mdx/pluginMdxHMR';
import { pluginIslandTransform } from './plugin-island/islandTransform';

export async function createVitePlugins(
  config: SiteConfig,
  restartServer?: () => Promise<void>,
  isSSR = false,
  mdxHMR = false
) {
  return [
    pluginUnocss(unocssOptions),
    pluginIndexHtml(),
    pluginConfig(config, restartServer),
    isSSR
      ? pluginIslandTransform(isSSR)
      : pluginReact({
          jsxRuntime: 'automatic',
          jsxImportSource: 'react'
        }),
    pluginRoutes({
      root: config.root,
      isSSR
    }),
    await createPluginMdx(mdxHMR),
    pluginMdxHMR()
  ];
}
