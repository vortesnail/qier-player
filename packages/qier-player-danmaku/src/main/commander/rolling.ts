import BaseRolling from './base-rolling';
import { RollingDanmu, Commander } from '../types';

class RollingCommander extends BaseRolling<RollingDanmu> {
  // constructor(el: HTMLElement, config: CommanderConfig) {
  //   super(el, config);
  // }

  add(danmu: RollingDanmu): boolean {
    return true;
  }

  _findTrack(): number {
    return 1;
  }

  _extractBarrage(): void {
    console.log('_extractBarrage');
  }

  render(): void {
    console.log('render');
  }
}

export default RollingCommander;
