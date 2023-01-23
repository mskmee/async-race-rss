import { Component } from './Component';
import { ComponentProps } from '../../types/types/ComponentProps';

export class InputComponent extends  Component<HTMLInputElement> {
  constructor(props?: ComponentProps<HTMLInputElement>) {
    super({ ...props, tag: 'input' });
    this.node.required = true;
  }
  get value(): string {
    return this.node.value;
  }
  set value(value: string) {
    this.node.value = value;
  }
}