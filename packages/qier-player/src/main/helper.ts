import { IPlayerOptions } from './types';
import { Player } from './player';
import { playControllerEle } from './modules/controller/eles/play';

export function setVideoAttrs(video: HTMLVideoElement, opts: IPlayerOptions['videoProps']): void {
  if (!opts) return;
  Object.keys(opts).forEach((k) => {
    video.setAttribute(k, opts[k]);
  });
}

export function registerNamedMap(player: Player) {
  player.registerControllerEle(playControllerEle());
  // player.registerControllerEle(timeControlItem());
}
