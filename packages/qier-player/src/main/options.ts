import { PlayerOptions } from './types';

const defaultOptions: Partial<PlayerOptions> = {};

export function processOptions(opts?: PlayerOptions): Required<PlayerOptions> {
  const dOpts = defaultOptions;
  const res = {
    ...dOpts,
    ...opts,
  } as Required<PlayerOptions>;

  return res;
}
