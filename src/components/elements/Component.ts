import { ComponentProps } from '../../types/types/ComponentProps';

export class Component<T extends HTMLElement = HTMLElement>{
  readonly _node: T;
  constructor(props?: ComponentProps<T>) {
    this._node = document.createElement(props?.tag ?? 'div') as T;
    if (props) Object.assign(this._node, props);
    if (props?.parent) props.parent.append(this._node);
  }

  set attribute(data: [string, string]){
    this.node.setAttribute(data[0], data[1]);
  }
  get attributeId(){
    return this.node.getAttribute('id');
  }
  get node(): T {
    return this._node;
  }
  get parent() {
    return this.node.parentElement;
  }
  destroy(): void {
    this.node.remove();
  }
  removeChild(child: Node | Component): Node {
    return this.node.removeChild(Component.toNode(child));
  }
  clear(): void {
    this.node.replaceChildren();
  }
  get text(): string | null {
    return this.node.textContent;
  }
  set text(value: string | null) {
    this.node.textContent = value;
  }
  get innerText(): string {
    return this.node.innerText;
  }
  set innerText(value: string) {
    this.node.innerText = value;
  }
  setText(value: string | null): void {
    value?.includes('\n') ? this.innerText = value : this.text = value;
  }

  get style(): CSSStyleDeclaration {
    return this.node.style;
  }
  private static toNode(component: string | Node | Component): Node {
    if (typeof component === 'string') {
      return document.createTextNode(component);
    }
    return component instanceof Component ? component.node : component;
  }
  private insert(target: 'before' | 'prepend' | 'append' | 'after', children: (string | Node | Component)[]) {
    this.node[target](...children.map(Component.toNode));
  }
  before(...children: (string | Node | Component)[]): void {
    this.insert('before', children);
  }
  prepend(...children: (string | Node | Component)[]): void {
    this.insert('prepend', children);
  }
  append(...children: (string | Node | Component)[]): void {
    this.insert('append', children);
  }
  after(...children: (string | Node | Component)[]): void {
    this.insert('after', children);
  }

  get onclick() {
    return this.node.onclick;
  }
  set onclick(value) {
    this.node.onclick = value;
  }

  get addEventListener() {
    return this.node.addEventListener.bind(this.node);
  }
  get classList() {
    return this.node.classList;
  }
  replaceWith(...nodes: (string | Node | Component)[]) {
    return this.node.replaceWith(...nodes.map(Component.toNode));
  }
}