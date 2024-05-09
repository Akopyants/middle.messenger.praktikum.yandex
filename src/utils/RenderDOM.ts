import Block from './Block';

function RenderDOM(query: string, block: Block) {
  const root = document.querySelector(query) as HTMLElement;
  if (root) {
    root.innerHTML = '';
    root.append(block.getContent()!);
  }

  block.dispatchComponentDidMount();
  return root;
}

export default RenderDOM;
