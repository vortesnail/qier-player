export const CLASS_PREFIX = 'qier-player';

export const EVENT = {
  PLAY: 'Play',
  PAUSE: 'Pause',
  TIME_UPDATE: 'TimeUpdate',
  PROGRESS: 'Progress',
  DURATION_CHANGE: 'DurationChange',
  VOLUME_CHANGE: 'VolumeChange',

  CONTROLLER_SHOW: 'ControlShow',
  CONTROLLER_HIDE: 'ControlHide',
  UPDATE_SIZE: 'UpdateSize',
} as const;

export const TIME = {
  CONTROLLER_BAR_HIDE: 3000,
  POPOVER_HIDE: 500,
};
