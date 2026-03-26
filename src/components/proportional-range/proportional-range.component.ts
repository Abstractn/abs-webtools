import { AbsComponent } from 'abs-component';
import { proportionalRange } from 'abs-utilities';

export class ProportionalRange implements AbsComponent {
  constructor(public readonly node: HTMLElement) {
    this.oldMinValueInputNode = this.node.getNode('[js-old-min]') as HTMLInputElement;
    this.oldMaxValueInputNode = this.node.getNode('[js-old-max]') as HTMLInputElement;
    this.newMinValueInputNode = this.node.getNode('[js-new-min]') as HTMLInputElement;
    this.newMaxValueInputNode = this.node.getNode('[js-new-max]') as HTMLInputElement;
    this.valueInputNode = this.node.getNode('[js-value]') as HTMLInputElement;
    this.generateButtonNode = this.node.getNode('[js-calculate]') as HTMLButtonElement;
    this.outputInputNode = this.node.getNode('[js-calculation-output]') as HTMLInputElement;
    this.formulaButtonNode = this.node.getNode('[js-get-formula]') as HTMLButtonElement;
  }
  
  private readonly oldMinValueInputNode: HTMLInputElement;
  private readonly oldMaxValueInputNode: HTMLInputElement;
  private readonly newMinValueInputNode: HTMLInputElement;
  private readonly newMaxValueInputNode: HTMLInputElement;
  private readonly valueInputNode: HTMLInputElement;
  private readonly generateButtonNode: HTMLButtonElement;
  private readonly outputInputNode: HTMLInputElement;
  private readonly formulaButtonNode: HTMLButtonElement;
  private readonly FORMULA_STRING = 'newValue = ((value - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin';

  private setCalculateButtonEvent(): void {
    this.generateButtonNode.on('click' as keyof ElementEventMap, (event) => {
      const oldMinValue = this.oldMinValueInputNode.value !== '' ? parseFloat(this.oldMinValueInputNode.value) : 0;
      const oldMaxValue = this.oldMaxValueInputNode.value !== '' ? parseFloat(this.oldMaxValueInputNode.value) : 100;
      const newMinValue = this.newMinValueInputNode.value !== '' ? parseFloat(this.newMinValueInputNode.value) : 0;
      const newMaxValue = this.newMaxValueInputNode.value !== '' ? parseFloat(this.newMaxValueInputNode.value) : 1;
      const valueValue = this.valueInputNode.value !== '' ? parseFloat(this.valueInputNode.value) : 1;
      const res = proportionalRange(
        oldMinValue, oldMaxValue,
        newMinValue, newMaxValue,
        valueValue
      );
      this.outputInputNode.value = res.toString();
    });
  }

  private setCopyInputEvent(): void {
    this.outputInputNode.on('click' as keyof ElementEventMap, (event) => {
      const value = this.outputInputNode.value;
      this.outputInputNode.select();
      this.outputInputNode.setSelectionRange(0, 99999);
      navigator.clipboard.writeText(value);
    });
  }

  private setFormulaButtonEvent(): void {
    this.formulaButtonNode.on('click', (event) => {
      alert('formula copied to clipboard');
      navigator.clipboard.writeText(this.FORMULA_STRING);
    });
  }

  init() {}

  ready() {
    this.setCalculateButtonEvent();
    this.setFormulaButtonEvent();
    this.setCopyInputEvent();
  }
}