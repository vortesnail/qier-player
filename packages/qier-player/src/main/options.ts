import { IPlayerOptions } from './types';

const defaultOptions: Partial<IPlayerOptions> = {
  videoProps: {
    crossorigin: 'anonymous',
    preload: 'auto',
    playsinline: 'true',
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
  } as Required<IPlayerOptions>;

  res.controller = res.controller || {
    progress: ['progress'],
    items: ['play', 'time'],
  };

  return res;
}
