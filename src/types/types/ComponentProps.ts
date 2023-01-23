import { IComponent } from '../interface/IComponent';

export type ComponentProps<T = HTMLElement> = IComponent & Partial<T>;
