import { Component } from './Component';
import { ComponentProps } from '../../types/types/ComponentProps';

export class AnchorComponent extends Component<HTMLAnchorElement> {
  constructor(props?: Omit<ComponentProps<HTMLAnchorElement>, 'toString'>) {
    super({ ...props, tag: 'a' });
  }
}
