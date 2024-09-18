import { AbsComponent } from 'abs-component';
import { randomInt } from 'abs-utilities';

export class RandomInt implements AbsComponent {
  constructor(public readonly node: HTMLElement) {
    this.minValueInputNode = this.node.querySelector('[js-min]') as HTMLInputElement;
    this.maxValueInputNode = this.node.querySelector('[js-max]') as HTMLInputElement;
    this.generateButtonNode = this.node.querySelector('[js-generate]') as HTMLButtonElement;
    this.outputInputNode = this.node.querySelector('[js-generate-output]') as HTMLInputElement;
  }
  
  private readonly minValueInputNode: HTMLInputElement;
  private readonly maxValueInputNode: HTMLInputElement;
  private readonly generateButtonNode: HTMLButtonElement;
  private readonly outputInputNode: HTMLInputElement;

  private setGenerateButtonEvent(): void {
    this.generateButtonNode.addEventListener('click', (event) => {
      const minValue = this.minValueInputNode.value !== '' ? parseInt(this.minValueInputNode.value) : 0;
      const maxValue = this.maxValueInputNode.value !== '' ? parseInt(this.maxValueInputNode.value) : 1;
      const res = randomInt(minValue, maxValue);
      this.outputInputNode.value = res.toString();
    });
  }

  private setCopyInputEvent(): void {
    this.outputInputNode.addEventListener('click', (event) => {
      const value = this.outputInputNode.value;
      const clipboard = new Clipboard();
      clipboard.writeText(value);
    });
  }

  init() {}

  ready() {
    this.setGenerateButtonEvent();
    this.setCopyInputEvent();
  }
}