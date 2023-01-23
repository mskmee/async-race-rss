import { Component } from './Component';
import { ComponentProps } from '../../types/types/ComponentProps';

export class ImageComponent extends Component<HTMLImageElement> {
  constructor(props?: ComponentProps<HTMLImageElement>) {
    super({...props, tag: 'img'});
  }

  get src(): string {
    return this.node.src;
  }

  set src(value: string) {
    this.node.src = value;
  }

  get decode() {
    return this.node.decode.bind(this.node);
  }
}