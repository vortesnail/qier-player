import { Player } from './player';
import { IPlayerOptions } from './types';

const defaultOptions: Partial<IPlayerOptions> = {
  posterOptions: {
    disabled: true,
    autoFill: true,
  },
  loadingOptions: {
    disabled: false,
    type: 'circle',
  },
  controller: {
    progress: ['progress'],
    eles: ['play', 'time', 'spacer', 'volume', 'settings', 'web-fullscreen', 'fullscreen'],
  },
  settings: ['mirroring', 'speed'],
  menus: ['loop'],
  showDefaultMenu: true,
  videoProps: {
    crossorigin: 'anonymous',
    preload: 'auto',
    playsinline: 'true',
  },
  progressOptions: {
    indicator: true,
  },
  shortcutOptions: {
    disabled: false,
    seekStep: 5,
    volumeStep: 0.1,
    showToast: true,
    toastDelay: 500,
  },
};

export function processOptions(opts?: IPlayerOptions): Required<IPlayerOptions> {
  const res = {
    ...defaultOptions,
    ...opts,
    posterOptions: {
      ...defaultOptions.posterOptions,
      ...opts?.posterOptions,
    },
    loadingOptions: {
      ...defaultOptions.loadingOptions,
      ...opts?.loadingOptions,
    },
    videoProps: {
      ...defaultOptions.videoProps,
      ...opts?.videoProps,
    },
    progressOptions: {
      ...defaultOptions.progressOptions,
      ...opts?.progressOptions,
    },
    shortcutOptions: {
      ...defaultOptions.shortcutOptions,
      ...opts?.shortcutOptions,
    },
  } as Required<IPlayerOptions>;

  return res;
}

export function defaultSetting(player: Player) {
  player.volume = 0.5;
}
