import { Component } from './Component';
import { ComponentProps } from '../../types/types/ComponentProps';

export class MainComponent extends Component {
  constructor(parent: HTMLElement, props?: ComponentProps) {
    super({ parent: parent, className: 'app main container', ...props, tag: 'main' });
  }
}