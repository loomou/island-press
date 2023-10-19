import { pluginMdxRollup } from './pluginMdxRollup';

export async function createPluginMdx(mdxHMR = false) {
  return [await pluginMdxRollup(mdxHMR)];
}
