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

  WEB_ENTER_FULLSCREEN: 'WebEnterFullscreen',
  WEB_EXIT_FULLSCREEN: 'WebExitFullscreen',
  ENTER_FULLSCREEN: 'EnterFullscreen',
  EXIT_FULLSCREEN: 'ExitFullscreen',

  MOUNTED: 'Mounted',
  POPOVER_SHOW_CHANGE: 'PopoverShowChange',
  CONTROLLER_ELES_UPDATE: 'ControllerElesUpdate',
} as const;

export const TIME = {
  CONTROLLER_BAR_HIDE: 3000,
  POPOVER_HIDE: 300,
  CLICK_TOGGLE_DELAY: 220,
};
