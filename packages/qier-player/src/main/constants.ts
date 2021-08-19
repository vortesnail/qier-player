export const CLASS_PREFIX = 'qier-player';

export const EVENT = {
  PLAY: 'Play',
  PAUSE: 'Pause',
  ENDED: 'Ended',
  TIME_UPDATE: 'TimeUpdate',
  PROGRESS: 'Progress',
  DURATION_CHANGE: 'DurationChange',
  VOLUME_CHANGE: 'VolumeChange',
  WAITING: 'Waiting',
  STALLED: 'Stalled',
  CANPLAY: 'Canplay',
  LOADED_METADATA: 'LoadedMetadata',
  RATE_CHANGE: 'RateChange',
  ERROR: 'Error',
  SEEKED: 'Seeked',

  CONTROLLER_SHOW: 'ControlShow',
  CONTROLLER_HIDE: 'ControlHide',
  UPDATE_SIZE: 'UpdateSize',

  WEB_ENTER_FULLSCREEN: 'WebEnterFullscreen',
  WEB_EXIT_FULLSCREEN: 'WebExitFullscreen',
  ENTER_FULLSCREEN: 'EnterFullscreen',
  EXIT_FULLSCREEN: 'ExitFullscreen',
  ENTER_PIP: 'EnterPip',
  EXIT_PIP: 'ExitPip',

  MOUNTED: 'Mounted',
  AFTER_INIT: 'AfterInit',
  BEFORE_DISPOSE: 'BeforeDispose',
  AFTER_DISPOSE: 'AfterDispose',
  POPOVER_SHOW_CHANGE: 'PopoverShowChange',
  CONTROLLER_ELES_UPDATE: 'ControllerElesUpdate',
  LOADING_SHOW: 'LoadingShow',
  LOADING_HIDE: 'LoadingHide',
} as const;

export const TIME = {
  CONTROLLER_BAR_HIDE: 3000,
  POPOVER_HIDE: 300,
  CLICK_TOGGLE_DELAY: 220,
};
