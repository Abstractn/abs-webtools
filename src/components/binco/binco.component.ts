import { AbsComponent } from 'abs-component';

enum ControlCharacter {
  OFF = '-',
  ON = '+',
}

enum Binary {
  ZERO = '0',
  ONE = '1',
}

export class Binco implements AbsComponent {
  constructor(public readonly node: HTMLElement) {
    this.textInputNode = this.node.getNode('[js-text]') as HTMLInputElement;
    this.codeInputNode = this.node.getNode('[js-code]') as HTMLInputElement;
    this.encodeButtonNode = this.node.getNode('[js-encode]') as HTMLButtonElement;
    this.decodeButtonNode = this.node.getNode('[js-decode]') as HTMLButtonElement;
    this.segmentInputNode = this.node.getNode('[js-segment]') as HTMLInputElement;
  }

  private readonly BYTE_LENGTH: number = 8;
  private readonly UNSUPPORTED_CHARACTER_ERROR: string = 'UnsupportedCharacterError';
  private readonly textInputNode: HTMLInputElement;
  private readonly codeInputNode: HTMLInputElement;
  private readonly encodeButtonNode: HTMLButtonElement;
  private readonly decodeButtonNode: HTMLButtonElement;
  private readonly segmentInputNode: HTMLInputElement;

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

  private binaryCounter(binaryString: string, segment: number): string {
    if(binaryString === '') {
      return '';
    } else {
      if(segment !== 1) {
        let res = '';
        let counter = 1;

        for(let i = 0; i <= binaryString.length; i++) {
          if((i + segment) % segment === 0) {
            if(i != 0) {
              res += counter;
            }
            if(i != binaryString.length) {
              res += binaryString[i] === Binary.ZERO ? ControlCharacter.OFF : ControlCharacter.ON;
              counter = 1;
            }
          } else {
            if(binaryString[i] === binaryString[i-1]) {
              counter++;
            } else {
              res += counter;
              counter = 1;
            }
          }
        }

        return res;
      } else {
        let res: string = binaryString[0] === Binary.ZERO ? ControlCharacter.OFF : ControlCharacter.ON;
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
  }

  private bincoCounter(bincoString: string): string {
    if(bincoString === '') {
      return '';
    } else {
      let res = '';
      let currentDigit = '0';
      for(let i = 0; i <= bincoString.length - 1; i++) {
        const currentCharacter = bincoString[i];

        const isCurrentCharacterControl = Object.values(ControlCharacter).includes(currentCharacter as ControlCharacter);
        if(isCurrentCharacterControl) {
          currentDigit = currentCharacter === ControlCharacter.OFF ? Binary.ZERO : Binary.ONE;
        } else {
          for(let j = parseInt(currentCharacter); j > 0; j--) {
            res += currentDigit;
          }
          currentDigit = currentDigit === Binary.ZERO ? Binary.ONE : Binary.ZERO;
        }
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

  private encode(value: string, segment: number): string {
    const binary: string = this.textToBinary(value);
    const res = binary === this.UNSUPPORTED_CHARACTER_ERROR ?
      this.UNSUPPORTED_CHARACTER_ERROR :
      this.binaryCounter(binary, segment);
    return res;
  }

  /**
   * Doesn't need `segment` parameter because `binaryToText` algorithm manages segmentation dynamically
   */
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
    this.encodeButtonNode.on('click' as keyof ElementEventMap, () => {
      const res = this.encode(this.textInputNode.value, this.segmentInputNode.valueAsNumber || 1);
      this.codeInputNode.value = res;
    });
    
    this.decodeButtonNode.on('click' as keyof ElementEventMap, () => {
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