import { visit } from 'unist-util-visit';
import type { Element } from 'hast';

export const rehypePluginPreWrapper = () => {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (
        node.tagName === 'pre' &&
        node.children[0]?.type === 'element' &&
        node.children[0].tagName === 'code' &&
        !node.data?.isVisited
      ) {
        const codeNode = node.children[0];
        const codeClassName = codeNode.properties?.className?.toString() || '';
        const lang = codeClassName.split('-')[1];

        const clonedNode: Element = {
          properties: undefined,
          type: 'element',
          tagName: 'pre',
          children: node.children,
          data: {
            isVisited: true,
            position: {
              opening: undefined,
              closing: undefined,
              properties: undefined
            }
          }
        };

        node.tagName = 'div';
        node.properties = node.properties || {};
        node.properties.className = codeClassName;

        node.children = [
          {
            type: 'element',
            tagName: 'span',
            properties: {
              className: 'lang'
            },
            children: [
              {
                type: 'text',
                value: lang
              }
            ]
          },
          clonedNode
        ];
      }
    });
  };
};
