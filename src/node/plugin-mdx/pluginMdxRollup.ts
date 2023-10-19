import type { Plugin } from 'vite';
import pluginMdx from '@mdx-js/rollup';
import remarkPluginGFM from 'remark-gfm';
import rehypePluginAutolinkHeadings from 'rehype-autolink-headings';
import rehypePluginSlug from 'rehype-slug';
import remarkPluginMDXFrontMatter from 'remark-mdx-frontmatter';
import remarkPluginFrontmatter from 'remark-frontmatter';
import { rehypePluginPreWrapper } from './rehypePlugins/rehypePluginPreWrapper';
import { rehypePluginShiki } from './rehypePlugins/rehypePluginShiki';
import { remarkPluginToc } from './remarkPlugins/remarkPluginToc';
import shiki from 'shiki';

export async function pluginMdxRollup(mdxHMR = false): Promise<Plugin> {
  return {
    enforce: 'pre',
    ...pluginMdx({
      remarkPlugins: [
        remarkPluginGFM,
        remarkPluginFrontmatter,
        [remarkPluginMDXFrontMatter, { name: 'frontmatter' }],
        remarkPluginToc
      ],
      rehypePlugins: [
        rehypePluginSlug,
        [
          rehypePluginAutolinkHeadings,
          {
            properties: {
              class: 'header-anchor'
            },
            content: {
              type: 'text',
              value: '#'
            }
          }
        ],
        rehypePluginPreWrapper,
        [
          rehypePluginShiki,
          { highlighter: await shiki.getHighlighter({ theme: 'nord' }) }
        ]
      ],
      jsxRuntime: 'automatic',
      development: mdxHMR
    })
  } as unknown as Plugin;
}
