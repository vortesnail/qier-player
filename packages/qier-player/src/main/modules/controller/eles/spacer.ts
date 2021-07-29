import { createEle } from '@Src/main/utils/dom';
import { IControllerEle } from '..';

export const spacerControllerEle = (): IControllerEle => ({
  id: 'spacer',
  el: createEle('div.spacer'),
});
