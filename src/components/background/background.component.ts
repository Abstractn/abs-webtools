import { AbsComponent } from 'abs-component';

export class Background implements AbsComponent {
  constructor(public readonly node: HTMLElement) {}

  init() {}

  ready() {}
}