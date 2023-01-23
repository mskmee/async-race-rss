import { Component } from './Component';
import { ComponentProps } from '../../types/types/ComponentProps';

export class ButtonComponent extends Component<HTMLButtonElement> {
  constructor(props?: ComponentProps<HTMLButtonElement>) {
    super({ ...props, tag: 'button' });
  }

  get disabled(): boolean {
    return this.node.disabled;
  }
  set disabled(value: boolean) {
    this.node.disabled = value;
  }
  click() {
    return this.node.click();
  }
}