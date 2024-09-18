import { AbsComponent } from 'abs-component';

export class Binco implements AbsComponent {
  constructor(public readonly node: HTMLElement) {}

  init() {}
  ready() {}
}

/*
const TEXT_ID_SELECTOR: string = '#field-text';
const CODE_ID_SELECTOR: string = '#field-code';
const COPY_TEXT_BUTTON_ID_SELECTOR: string = '#copy-text';
const COPY_CODE_BUTTON_ID_SELECTOR: string = '#copy-code';
const TEXT_INPUT_NODE: HTMLElement = document.querySelector(TEXT_ID_SELECTOR) as HTMLElement;
const CODE_INPUT_NODE: HTMLElement = document.querySelector(CODE_ID_SELECTOR) as HTMLElement;
const COPY_TEXT_BUTTON_NODE: HTMLElement = document.querySelector(COPY_TEXT_BUTTON_ID_SELECTOR) as HTMLElement;
const COPY_CODE_BUTTON_NODE: HTMLElement = document.querySelector(COPY_CODE_BUTTON_ID_SELECTOR) as HTMLElement;
const BYTE_LENGTH: number = 8;
const UNSUPPORTED_CHARACTER_ERROR: string = 'UnsupportedCharacterError';

function init(): void {
  eventManager();
}

function fixBinary(binary: string): string {
  while(binary.length <= BYTE_LENGTH - 1) {
    binary = '0' + binary;
  }
  return binary;
}

function textToBinary(text: string): string {
  let res = '';
  for(let i = 0; i <= (text.length - 1); i++) {
    let characterToBinary = text[i].charCodeAt(0).toString(2);
    if(characterToBinary.length > BYTE_LENGTH) {
      return UNSUPPORTED_CHARACTER_ERROR;
    }
    res += fixBinary(characterToBinary);
  }
  return res;
}

function binaryCounter(binaryString: string): string {
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

function bincoCounter(bincoString: string): string {
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

function splitBinaryStringByBytes(binaryString: string): Array<string> {
  return binaryString.match(new RegExp('.{1,' + BYTE_LENGTH + '}', 'g')) || [''];
}

function binaryToText(binaryArray: Array<string>): string {
  let res = '';
  for(let i = 0; i <= (binaryArray.length - 1); i++) {
    // sanitized parsing
    res += binaryArray[i].length === BYTE_LENGTH ?
      String.fromCharCode(parseInt(binaryArray[i], 2)) :
      '';
    // unsanitized parsing
    //res += String.fromCharCode(parseInt(binaryArray[i], 2));
  }
  return res;
}

function encrypt(): void {
  const binary: string = textToBinary(TEXT_INPUT_NODE.value);
  if(binary === UNSUPPORTED_CHARACTER_ERROR) {
    CODE_INPUT_NODE.value = UNSUPPORTED_CHARACTER_ERROR;  
  } else {
    const binco: string = binaryCounter(binary);
    CODE_INPUT_NODE.value = binco;
  }
}

function decrypt(): void {
  const binaryString: string = bincoCounter(CODE_INPUT_NODE.value);
  const binaryArray: Array<string> = splitBinaryStringByBytes(binaryString);
  TEXT_INPUT_NODE.value = binaryToText(binaryArray);
}

function copyToClipboard(inputNode: HTMLElement): void {
  inputNode.select();
  inputNode.setSelectionRange(0, 99999); // for mobile
  navigator.clipboard.writeText(inputNode.value);
}

function eventManager(): void {
  TEXT_INPUT_NODE.addEventListener('input', encrypt);
  CODE_INPUT_NODE.addEventListener('input', decrypt);
  COPY_TEXT_BUTTON_NODE.addEventListener('click', () => { copyToClipboard(TEXT_INPUT_NODE); });
  COPY_CODE_BUTTON_NODE.addEventListener('click', () => { copyToClipboard(CODE_INPUT_NODE); });
}

init();
*/