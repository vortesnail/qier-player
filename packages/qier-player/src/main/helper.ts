import { IPlayerOptions } from './types';
import { Player } from './player';
import { playControllerEle } from './modules/controller/eles/play';
import { Dispose, addDispose } from './utils/dispose';
import { EVENT } from './constants';

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

function mark(player: Player, ori: string, event: string): Dispose {
  const fn = (ev: Event) => player.emit(event, ev);
  player.video.addEventListener(ori, fn);
  return { dispose: () => player.video.removeEventListener(ori, fn) };
}

export function markingEvent(player: Player): void {
  const dis = (d: Dispose) => addDispose(player, d);

  dis(mark(player, 'play', EVENT.PLAY));
  dis(mark(player, 'pause', EVENT.PAUSE));
}
