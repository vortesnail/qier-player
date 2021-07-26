import { PlayerOptions } from './types';

const defaultOptions: Partial<PlayerOptions> = {
  videoProps: {
    crossorigin: 'anonymous',
    preload: 'auto',
    playsinline: 'true',
  },
};

export function processOptions(opts?: PlayerOptions): Required<PlayerOptions> {
  const res = {
    ...defaultOptions,
    ...opts,
  } as Required<PlayerOptions>;

  return res;
}
