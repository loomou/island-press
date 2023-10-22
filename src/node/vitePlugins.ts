import { pluginIndexHtml } from './plugin-island/indexHtml';
import pluginReact from '@vitejs/plugin-react';
import { pluginConfig } from './plugin-island/config';
import { pluginRoutes } from './plugin-routes';
import { SiteConfig } from 'shared/types';
import { createPluginMdx } from './plugin-mdx';
import pluginUnocss from 'unocss/vite';
import unocssOptions from './unocssOptions';
import { pluginMdxHMR } from './plugin-mdx/pluginMdxHMR';

export async function createVitePlugins(
  config: SiteConfig,
  restartServer?: () => Promise<void>,
  isSSR = false,
  mdxHMR = false
) {
  return [
    await createPluginMdx(mdxHMR),
    pluginUnocss(unocssOptions),
    pluginIndexHtml(),
    pluginReact({
      jsxRuntime: 'automatic'
    }),
    pluginConfig(config, restartServer),
    pluginRoutes({
      root: config.root,
      isSSR
    }),
    pluginMdxHMR()
  ];
}
