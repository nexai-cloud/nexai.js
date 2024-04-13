var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function loadScript(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const script = document.createElement('script');
        script.src = url;
        yield new Promise((resolve, reject) => {
            script.onload = () => resolve();
            script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
            document.head.appendChild(script);
        });
    });
}
const imports = [
    () => __awaiter(void 0, void 0, void 0, function* () {
        if (!('React' in window)) {
            yield loadScript('https://unpkg.com/react@18.2.0/umd/react.production.min.js');
        }
    }),
    () => __awaiter(void 0, void 0, void 0, function* () {
        if (!('ReactDOM' in window)) {
            yield loadScript('https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js');
        }
    }),
    () => __awaiter(void 0, void 0, void 0, function* () {
        if (!('mobx' in window)) {
            yield loadScript('https://unpkg.com/mobx@6.12.1/dist/mobx.umd.production.min.js');
        }
    }),
    () => __awaiter(void 0, void 0, void 0, function* () {
        if (!('mobxReactLite' in window)) {
            yield loadScript('https://unpkg.com/mobx-react-lite@3.4.1/dist/mobxreactlite.umd.production.min.js');
        }
    })
];
export const loadExternalScripts = () => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(imports.map((importFn) => __awaiter(void 0, void 0, void 0, function* () { return yield importFn(); })));
});
