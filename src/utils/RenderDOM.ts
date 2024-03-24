import Component from './Component';

function RenderDOM(query: string, block: Component) {
  const root = document.querySelector(query) as HTMLElement;
  if (root) {
    root.appendChild(block.getContent()!);
  }
  block.dispatchComponentDidMount();
  return root;
}

export default RenderDOM;
