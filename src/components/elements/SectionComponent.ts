import { Component } from './Component';
import { ComponentProps } from '../../types/types/ComponentProps';

export class SectionComponent extends Component {
  constructor(props?: ComponentProps) {
    super({ className: 'section', ...props, tag: 'section' });
  }
}