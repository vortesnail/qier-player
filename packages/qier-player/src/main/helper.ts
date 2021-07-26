import { PlayerOptions } from './types';

export function setVideoAttrs(video: HTMLVideoElement, opts: PlayerOptions['videoProps']): void {
  if (!opts) return;
  Object.keys(opts).forEach((k) => {
    video.setAttribute(k, opts[k]);
  });
}
