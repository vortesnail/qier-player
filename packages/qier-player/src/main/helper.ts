import { IPlayerOptions } from './types';
import { Player } from './player';
import { playControllerEle } from './modules/controller/eles/play';
import { timeControllerEle } from './modules/controller/eles/time';
import { progressControllerEle } from './modules/controller/progress';
import { Dispose, addDispose } from './utils/dispose';
import { EVENT } from './constants';
import { throttle } from './utils/freUse';
import { volumeControllerEle } from './modules/controller/eles/volume';
import { settingControllerEle } from './modules/controller/eles/settings';
import { MirroringSettingItem } from './setting-items/mirroring';
import { speedSettingItem } from './setting-items/speed';

export function setVideoAttrs(video: HTMLVideoElement, opts: IPlayerOptions['videoProps']): void {
  if (!opts) return;
  Object.keys(opts).forEach((k) => {
    video.setAttribute(k, opts[k]);
  });
}

export function setCssVariables(el: HTMLElement, opts: IPlayerOptions): void {
  const style = el.style;
  if (opts.themeColor) style.setProperty('--theme-color', opts.themeColor);
  if (opts.progressOptions?.playedBg) style.setProperty('--progress-played-bg', opts.progressOptions.playedBg);
  if (opts.progressOptions?.buffBg) style.setProperty('--progress-buff-bg', opts.progressOptions.buffBg);
}

export function registerNamedMap(player: Player) {
  player.registerControllerEle(playControllerEle());
  player.registerControllerEle(timeControllerEle());
  player.registerControllerEle(volumeControllerEle());
  player.registerControllerEle(settingControllerEle());
  player.registerSettingItem(MirroringSettingItem());
  player.registerSettingItem(speedSettingItem());

  player.registerControllerEle(progressControllerEle());
}

function mark(player: Player, ori: string, event: string): Dispose {
  const fn = (ev: Event) => player.emit(event, ev);
  player.video.addEventListener(ori, fn);
  return { dispose: () => player.video.removeEventListener(ori, fn) };
}

function markThrottle(player: Player, ori: string, event: string, dom: HTMLElement | Window = player.video): Dispose {
  const fn = (ev: Event) => player.emit(event, ev);
  dom.addEventListener(ori, throttle(fn));
  return { dispose: () => dom.removeEventListener(ori, fn) };
}

export function markingEvent(player: Player): void {
  const dis = (d: Dispose) => addDispose(player, d);

  dis(mark(player, 'play', EVENT.PLAY));
  dis(mark(player, 'pause', EVENT.PAUSE));
  dis(mark(player, 'durationchange', EVENT.DURATION_CHANGE));

  dis(markThrottle(player, 'timeupdate', EVENT.TIME_UPDATE));
  dis(markThrottle(player, 'progress', EVENT.PROGRESS));
  dis(markThrottle(player, 'volumechange', EVENT.VOLUME_CHANGE));
}
