import { IPlayerOptions } from './types';

const defaultOptions: Partial<IPlayerOptions> = {
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

  res.controller = res.controller || {
    progress: ['progress'],
    eles: ['play', 'time'],
  };

  return res;
}
