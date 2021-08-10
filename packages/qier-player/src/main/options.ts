import { Player } from './player';
import { IPlayerOptions } from './types';

const defaultOptions: Partial<IPlayerOptions> = {
  controller: {
    progress: ['progress'],
    eles: ['play', 'time', 'spacer', 'volume', 'settings', 'web-fullscreen', 'fullscreen'],
  },
  settings: ['mirroring', 'speed'],
  videoProps: {
    crossorigin: 'anonymous',
    preload: 'auto',
    playsinline: 'true',
  },
  progressOptions: {
    indicator: true,
  },
};

export function processOptions(opts?: IPlayerOptions): Required<IPlayerOptions> {
  const res = {
    ...defaultOptions,
    ...opts,
    videoProps: {
      ...defaultOptions.videoProps,
      ...opts?.videoProps,
    },
    progressOptions: {
      ...defaultOptions.progressOptions,
      ...opts?.progressOptions,
    },
  } as Required<IPlayerOptions>;

  return res;
}

export function defaultSetting(player: Player) {
  player.volume = 0.5;
}
