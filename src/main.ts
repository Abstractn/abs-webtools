import './main.scss';

import { AbsComponentManager } from 'abs-component';
import { absPolyfill } from 'abs-utilities';

import { AniCalc } from './components/ani-calc/ani-calc.component.ts';
import { Binco } from './components/binco/binco.component.ts';
import { Header } from './components/header/header.component.ts';
import { Page } from './components/page/page.component.ts';
import { ProportionalRange } from './components/proportional-range/proportional-range.component.ts';
import { RandomInt } from './components/random-int/random-int.component.ts';

absPolyfill();

export const absComponentManager = new AbsComponentManager({
  nodeAttributeSelector: 'cmp',
});

[
  AniCalc,
  Binco,
  Header,
  Page,
  ProportionalRange,
  RandomInt,
].forEach(Component => {
  absComponentManager.registerComponent(
    Component.prototype.constructor.name,
    Component
  );
});

absComponentManager.initComponents();