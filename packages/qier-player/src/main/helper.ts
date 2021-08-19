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
import { webFullscreenControllerEle } from './modules/controller/eles/web-fullscreen';
import { fullscreenControllerEle } from './modules/controller/eles/fullscreen';
import { loopMenuItem } from './menu-items/loop';

export function setVideoAttrs(video: HTMLVideoElement, opts: IPlayerOptions['videoProps']): void {
  if (!opts) return;
  Object.keys(opts).forEach((k) => {
    video.setAttribute(k, opts[k]);
  });
}

export function setCssVariables(el: HTMLElement, opts: IPlayerOptions): void {
  const style = el.style;
  if (opts.themeColor) style.setProperty('--theme-color', opts.themeColor);
  if (opts.posterOptions?.bgColor) style.setProperty('--poster-bg', opts.posterOptions.bgColor);
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
  player.registerControllerEle(webFullscreenControllerEle());
  player.registerControllerEle(fullscreenControllerEle());
  player.registerControllerEle(progressControllerEle());

  player.registerMenuItem(loopMenuItem());
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
  dis(mark(player, 'ended', EVENT.ENDED));
  dis(mark(player, 'durationchange', EVENT.DURATION_CHANGE));
  dis(mark(player, 'waiting', EVENT.WAITING));
  dis(mark(player, 'stalled', EVENT.STALLED));
  dis(mark(player, 'canplay', EVENT.CANPLAY));
  dis(mark(player, 'loadedmetadata', EVENT.LOADED_METADATA));
  dis(mark(player, 'ratechange', EVENT.RATE_CHANGE));
  dis(mark(player, 'error', EVENT.ERROR));
  dis(mark(player, 'seeked', EVENT.SEEKED));
  dis(mark(player, 'enterpictureinpicture', EVENT.ENTER_PIP));
  dis(mark(player, 'leavepictureinpicture', EVENT.EXIT_PIP));

  dis(markThrottle(player, 'timeupdate', EVENT.TIME_UPDATE));
  dis(markThrottle(player, 'progress', EVENT.PROGRESS));
  dis(markThrottle(player, 'volumechange', EVENT.VOLUME_CHANGE));

  dis(markThrottle(player, 'resize', EVENT.UPDATE_SIZE, window));
  if ((window as any).ResizeObserver) {
    const ro = new (window as any).ResizeObserver(throttle(() => player.emit(EVENT.UPDATE_SIZE)));
    ro.observe(player.el);
    dis({ dispose: () => ro.disconnect() });
  }

  player.on(EVENT.LOADED_METADATA, () => {
    if (player.video.paused) {
      player.emit(EVENT.PAUSE);
    } else {
      player.emit(EVENT.PLAY);
    }
  });
}
