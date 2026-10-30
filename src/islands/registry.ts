import type { ComponentProps } from 'react';
import PracticeRunner from './PracticeRunner';
import TestRunner from './TestRunner';
import RichField from './RichField';
import FigureField from './FigureField';

/** Các thành phần tương tác được gắn React phía trình duyệt. */
export const islands = {
  PracticeRunner,
  TestRunner,
  RichField,
  FigureField,
};

export type IslandName = keyof typeof islands;
export type IslandProps<N extends IslandName> = ComponentProps<(typeof islands)[N]>;
