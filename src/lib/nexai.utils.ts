export async function loadScript(url: string): Promise<void> {
  const script = document.createElement('script');
  script.src = url;
  await new Promise<void>((resolve, reject) => {
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
    document.head.appendChild(script);
  });
}

const imports: (() => Promise<void>)[] = [
  async () => {
    if (!('React' in window)) {
      await loadScript('https://unpkg.com/react@18.2.0/umd/react.production.min.js');
    }
  },
  async () => {
    if (!('ReactDOM' in window)) {
      await loadScript('https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js');
    }
  },
  async () => {
    if (!('mobx' in window)) {
      await loadScript('https://unpkg.com/mobx@6.12.1/dist/mobx.umd.production.min.js');
    }
  },
  async () => {
    if (!('mobxReactLite' in window)) {
      await loadScript('https://unpkg.com/mobx-react-lite@3.4.1/dist/mobxreactlite.umd.production.min.js');
    }
  }
];

export const loadExternalScripts = async (): Promise<void> => {
  await Promise.all(imports.map(async (importFn) => await importFn()));
};
