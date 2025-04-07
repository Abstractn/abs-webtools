import { AbsComponent } from 'abs-component';

export class Binco implements AbsComponent {
  constructor(public readonly node: HTMLElement) {
    this.textInputNode = this.node.getNode('[js-text]') as HTMLInputElement;
    this.codeInputNode = this.node.getNode('[js-code]') as HTMLInputElement;
    this.encodeButtonNode = this.node.getNode('[js-encode]') as HTMLButtonElement;
    this.decodeButtonNode = this.node.getNode('[js-decode]') as HTMLButtonElement;
  }

  private readonly BYTE_LENGTH: number = 8;
  private readonly UNSUPPORTED_CHARACTER_ERROR: string = 'UnsupportedCharacterError';
  private readonly textInputNode: HTMLInputElement;
  private readonly codeInputNode: HTMLInputElement;
  private readonly encodeButtonNode: HTMLButtonElement;
  private readonly decodeButtonNode: HTMLButtonElement;

  private textToBinary(text: string): string {
    let res = '';
    for(let i = 0; i <= (text.length - 1); i++) {
      let characterToBinary = text[i].charCodeAt(0).toString(2);
      if(characterToBinary.length > this.BYTE_LENGTH) {
        return this.UNSUPPORTED_CHARACTER_ERROR;
      }
      res += characterToBinary.padStart(8, '0');
    }
    return res;
  }

  private binaryCounter(binaryString: string): string {
    if(binaryString === '') {
      return '';
    } else {
      let res = binaryString[0] === '0' ? '-' : '+';
      let counter = 1;
      for(let i = 1; i <= binaryString.length; i++) {
        if(binaryString[i] === binaryString[i-1]) {
          counter++;
        } else {
          res += counter;
          counter = 1;
        }
      }
      return res;
    }
  }

  private bincoCounter(bincoString: string): string {
    if(bincoString === '') {
      return '';
    } else {
      let res = '';
      let currentDigit = bincoString[0] === '-' ? '0' : '1';
      for(let i = 1; i <= bincoString.length - 1; i++) {
        for(let j = parseInt(bincoString[i]); j > 0; j--) {
          res += currentDigit;
        }
        currentDigit = currentDigit === '0' ? '1' : '0';
      }
      return res;
    }
  }

  private splitBinaryStringByBytes(binaryString: string): Array<string> {
    return binaryString.match(new RegExp('.{1,' + this.BYTE_LENGTH + '}', 'g')) || [''];
  }

  private binaryToText(binaryArray: Array<string>): string {
    let res = '';
    for(let i = 0; i <= (binaryArray.length - 1); i++) {
      // sanitized parsing
      res += binaryArray[i].length === this.BYTE_LENGTH ?
        String.fromCharCode(parseInt(binaryArray[i], 2)) :
        '';
      // unsanitized parsing
      //res += String.fromCharCode(parseInt(binaryArray[i], 2));
    }
    return res;
  }

  private encode(value: string): string {
    let res = '';
    const binary: string = this.textToBinary(value);
    if(binary === this.UNSUPPORTED_CHARACTER_ERROR) {
      res = this.UNSUPPORTED_CHARACTER_ERROR;  
    } else {
      res = this.binaryCounter(binary);
    }
    return res;
  }

  private decode(value: string): string {
    const binaryString: string = this.bincoCounter(value);
    const binaryArray: Array<string> = this.splitBinaryStringByBytes(binaryString);
    const res = this.binaryToText(binaryArray);
    return res;
  }

  private copyToClipboard(inputNode: HTMLInputElement): void {
    inputNode.select();
    inputNode.setSelectionRange(0, 99999); // for mobile
    navigator.clipboard.writeText(inputNode.value);
  }

  private setEvents() {
    this.encodeButtonNode.addEventListener('click', () => {
      //this.codeInputNode.value = '';
      const res = this.encode(this.textInputNode.value);
      this.codeInputNode.value = res;
    });
    
    this.decodeButtonNode.addEventListener('click', () => {
      //this.textInputNode.value = '';
      const res = this.decode(this.codeInputNode.value);
      this.textInputNode.value = res;
    });

    //TODO `this.copyToClipboard(...)`
  }

  init() {
    this.setEvents();
  }

  ready() {}
}