import { PACKAGE_ROOT, TS_REGEX } from '../constants';
import { Plugin, transformWithEsbuild } from 'vite';
import { transformAsync } from '@babel/core';
import babelPluginIsland from '../babel-plugin/babel-plugin-island';
import { join } from 'path';

export function pluginIslandTransform(isServer: boolean): Plugin {
  return {
    name: 'island:vite-plugin-internal',
    enforce: 'pre',
    async transform(code, id, options) {
      if (options?.ssr && TS_REGEX.test(id)) {
        const strippedTypes = await transformWithEsbuild(code, id, {
          jsx: 'preserve',
          loader: 'tsx'
        });

        const result = await transformAsync((await strippedTypes).code, {
          filename: id,
          presets: [
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
                importSource: isServer
                  ? join(PACKAGE_ROOT, 'src', 'runtime')
                  : 'react'
              }
            ]
          ],
          plugins: [babelPluginIsland]
        });

        return {
          code: result?.code || code,
          map: result?.map
        };
      }
    }
  };
}
