import { AbsComponent } from 'abs-component';
import { proportionalRange } from 'abs-utilities';

export class ProportionalRange implements AbsComponent {
  constructor(public readonly node: HTMLElement) {
    this.oldMinValueInputNode = this.node.querySelector('[js-old-min]') as HTMLInputElement;
    this.oldMaxValueInputNode = this.node.querySelector('[js-old-max]') as HTMLInputElement;
    this.newMinValueInputNode = this.node.querySelector('[js-new-min]') as HTMLInputElement;
    this.newMaxValueInputNode = this.node.querySelector('[js-new-max]') as HTMLInputElement;
    this.valueInputNode = this.node.querySelector('[js-value]') as HTMLInputElement;
    this.generateButtonNode = this.node.querySelector('[js-calculate]') as HTMLButtonElement;
    this.outputInputNode = this.node.querySelector('[js-calculation-output]') as HTMLInputElement;
  }
  
  private readonly oldMinValueInputNode: HTMLInputElement;
  private readonly oldMaxValueInputNode: HTMLInputElement;
  private readonly newMinValueInputNode: HTMLInputElement;
  private readonly newMaxValueInputNode: HTMLInputElement;
  private readonly valueInputNode: HTMLInputElement;
  private readonly generateButtonNode: HTMLButtonElement;
  private readonly outputInputNode: HTMLInputElement;

  private setCalculateButtonEvent(): void {
    this.generateButtonNode.addEventListener('click', (event) => {
      const oldMinValue = this.oldMinValueInputNode.value !== '' ? parseInt(this.oldMinValueInputNode.value) : 0;
      const oldMaxValue = this.oldMaxValueInputNode.value !== '' ? parseInt(this.oldMaxValueInputNode.value) : 100;
      const newMinValue = this.newMinValueInputNode.value !== '' ? parseInt(this.newMinValueInputNode.value) : 0;
      const newMaxValue = this.newMaxValueInputNode.value !== '' ? parseInt(this.newMaxValueInputNode.value) : 1;
      const valueValue = this.valueInputNode.value !== '' ? parseInt(this.valueInputNode.value) : 1;
      const res = proportionalRange(
        oldMinValue, oldMaxValue,
        newMinValue, newMaxValue,
        valueValue
      );
      this.outputInputNode.value = res.toString();
    });
  }

  private setCopyInputEvent(): void {
    this.outputInputNode.addEventListener('click', (event) => {
      const value = this.outputInputNode.value;
      this.outputInputNode.select();
      this.outputInputNode.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(value);
    });
  }

  init() {}

  ready() {
    this.setCalculateButtonEvent();
    this.setCopyInputEvent();
  }
}