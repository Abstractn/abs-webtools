import { AbsComponent } from 'abs-component';

export class Page implements AbsComponent {
  constructor(public readonly node: HTMLElement) {
    this.aniCalcViewNode = this.node.getNode('view#ani-calc') as HTMLElement;
    //TODO
  }

  public readonly aniCalcViewNode: HTMLElement;
  //TODO

  init() {}

  ready() {}
}