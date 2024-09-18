import { AbsComponent } from 'abs-component';
import { proportionalRange } from 'abs-utilities';

export class ProportionalRange implements AbsComponent {
  constructor(public readonly node: HTMLElement) {}

  init() {}
  ready() {}
}