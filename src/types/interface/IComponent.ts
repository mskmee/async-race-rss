import { Component } from '../../components/elements/Component';

export class IComponent {
  atr? : [string, string];
  parent?: HTMLElement | Component;
  tag?: keyof HTMLElementTagNameMap;
}