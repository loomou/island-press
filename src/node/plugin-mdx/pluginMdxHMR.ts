import { MD_REGEX } from '../constants';
import { Plugin } from 'vite';

interface MessageData {
  filePath: string;
  changeKey: string;
}

export const runtimePublicPath = '/@react-refresh';

const header = `
import RefreshRuntime from "${runtimePublicPath}";
import { isEqual } from 'lodash-es';

const inWebWorker = typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;
let prevRefreshReg;
let prevRefreshSig;

if (import.meta.hot) {
  if (!window.__vite_plugin_react_preamble_installed__) {
    throw new Error(
      "@vitejs/plugin-react can't detect preamble. Something is wrong. " +
      "See https://github.com/vitejs/vite-plugin-react/pull/11#discussion_r430879201"
    );
  }

  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    RefreshRuntime.register(type, __SOURCE__ + " " + id)
  };
  window.$RefreshSig$ = RefreshRuntime.createSignatureFunctionForTransform;
}`.replace(/\n+/g, '');

const insertCode = `
function debounce(fn, delay) {
  let handle;
  return () => {
    clearTimeout(handle);
    handle = setTimeout(fn, delay);
  };
}

const enqueueUpdate = debounce(RefreshRuntime.performReactRefresh, 16);

function predicateOnExport(moduleExports, predicate) {
  for (const key in moduleExports) {
    if (key === '__esModule') continue;
    const desc = Object.getOwnPropertyDescriptor(moduleExports, key);
    if (desc && desc.get) return false;
    if (!predicate(key, moduleExports[key])) return false;
  }
  return true;
}

function validateRefreshBoundaryAndEnqueueUpdates(prevExports, nextExports) {
  if (!predicateOnExport(prevExports, (key) => key in nextExports)) {
    return 'Could not Fast Refresh (export removed)';
  }
  if (!predicateOnExport(nextExports, (key) => key in prevExports)) {
    return 'Could not Fast Refresh (new export)';
  }

  let hasExports = false;
  const allExportsAreComponentsOrUnchanged = predicateOnExport(
    nextExports,
    (key, value) => {
      hasExports = true;
      if (RefreshRuntime.isLikelyComponentType(value)) {
        return true;
      }
      if (typeof value === 'object' && value.hasOwnProperty('$$typeof')) {
        return prevExports[key] === nextExports[key];
      }
      if (!isEqual(prevExports[key], nextExports[key])) {
        import.meta.hot.send('mdx-change', {
          filePath: import.meta.url,
          changeKey: key.toString()
        })
      }
      return true;
    }
  );
  if (hasExports && allExportsAreComponentsOrUnchanged) {
    enqueueUpdate();
  } else {
    return 'Could not Fast Refresh. Learn more at https://github.com/vitejs/vite-plugin-react/tree/main/packages/plugin-react#consistent-components-exports';
  }
}`;
// .replace(/\n+/g, '');

const footer = `
var _c;
_c = MDXContent;
$RefreshReg$(_c, "MDXContent");
if (import.meta.hot) {
  import.meta.hot.accept();
  window.$RefreshReg$ = prevRefreshReg;
  window.$RefreshSig$ = prevRefreshSig;
  
  RefreshRuntime.__hmr_import(import.meta.url).then((currentExports) => {
    RefreshRuntime.registerExportsForReactRefresh(__SOURCE__, currentExports);
    import.meta.hot.accept((nextExports) => {
      if (!nextExports) return;
      validateRefreshBoundaryAndEnqueueUpdates(currentExports, nextExports);
    });
  });
}`.replace(/\n+/g, '');

export function addRefreshWrapper(code: string, id: string): string {
  return (
    // isEqualCode +
    header.replace('__SOURCE__', JSON.stringify(id)) +
    code +
    insertCode +
    footer.replace('__SOURCE__', JSON.stringify(id))
  );
}

export function pluginMdxHMR(): Plugin {
  return {
    name: 'vite-plugin-mdx-hmr',
    apply: 'serve',
    configureServer(server) {
      server.ws.on('mdx-change', (data: MessageData) => {
        server.ws.send('mdx-changed', data);
      });
    },
    async transform(code, id) {
      if (MD_REGEX.test(id)) {
        if (!code.includes('import.meta.hot')) {
          return addRefreshWrapper(code, id);
        }
        return code;
      }
    }
  };
}
