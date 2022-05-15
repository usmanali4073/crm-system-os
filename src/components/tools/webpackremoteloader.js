import { lazy, useEffect, useState } from 'react';

export function loadComponent(scope, module) {
    return async () => {
      // Initializes the share scope. This fills it with known provided modules from this build and all remotes
      // eslint-disable-next-line no-undef
      await __webpack_init_sharing__('default');
      const container = window[scope]; // or get the container somewhere else
      // Initialize the container, it may provide shared modules
      // eslint-disable-next-line no-undef
      await container.init(__webpack_share_scopes__.default);
      const factory = await window[scope].get(module);
      const Module = factory();
      return Module;
    };
  }
  
  const urlCache = new Set();
  const useDynamicScript = url => {
    const [ready, setReady] = useState(false);
    const [errorLoading, setErrorLoading] = useState(false);
  
    useEffect(() => {
      if (!url) return;
  
      if (urlCache.has(url)) {
        setReady(true);
        setErrorLoading(false);
        return;
      }
  
      setReady(false);
      setErrorLoading(false);
  
      const element = document.createElement('script');
  
      element.src = url;
      element.type = 'text/javascript';
      element.async = true;
  
      element.onload = () => {
        urlCache.add(url);
        setReady(true);
      };
  
      element.onerror = () => {
        setReady(false);
        setErrorLoading(true);
      };
  
      document.head.appendChild(element);
  
      return () => {
        urlCache.delete(url);
        document.head.removeChild(element);
      };
    }, [url]);
  
    return {
      errorLoading,
      ready,
    };
  };
  
  /**
 * Generates a table head
 * @param {string} remoteUrl - Remote Url for Entrypoint http://localhost:3000/
 * @param {string} scope - Entrypoint Scope Name MFA1
 * @param {string} module - Expose Module Name (./Button)
 */
  const componentCache = new Map();
  export const useFederatedComponent = (remoteUrl, scope, module) => {
    const key = `${remoteUrl}-${scope}-${module}`;
    const [Component, setComponent] = useState(null);
  
    const { ready, errorLoading } = useDynamicScript(remoteUrl);
    useEffect(() => {
      if (Component) setComponent(null);
      // Only recalculate when key changes
      // eslint-disable-next-line
    }, [key]);
  
    useEffect(() => {
      if (ready && !Component) {
        const Comp = lazy(loadComponent(scope, module));
        componentCache.set(key, Comp);
        setComponent(Comp);
      }
      // key includes all dependencies (scope/module)
      // eslint-disable-next-line
    }, [Component, ready, key]);
  
    return { errorLoading, Component };
  };

