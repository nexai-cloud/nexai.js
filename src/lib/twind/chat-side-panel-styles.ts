// no need for namespaces. this goes in shadow dom
export const chatSidePanelStyles = `
/* Reset all inheritable styles */

:host {
  all: initial;
}

/* Selectively re-apply desired styles */
:host {
  font-family: inherit;
}

code {
  padding: 5px 8px 5px 8px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 0 5px #e2e8f0;
  margin: 5px;
  background: #f7f9fb;
  display: block;
  border-radius: 8px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 500px;
  font-size: 12px;
}

.prism-code {
  padding: 5px 8px 5px 8px;
  box-shadow: 0 0 5px #e2e8f0;
  margin: 5px;
  display: block;
  border-radius: 8px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 500px;
  font-size: 12px;
}

.code-block .code-copy {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s;
}

.code-block:hover .code-copy {
  opacity: 1;
  pointer-events: all;
}
`