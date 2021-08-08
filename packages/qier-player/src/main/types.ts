import { IControllerEle } from './modules/controller';
import { ISettingItem } from './modules/controller/eles/settings';

export interface IController {
  progress: (IControllerEle | string)[];
  eles: (IControllerEle | string)[];
}

export interface IProgressOptions {
  dot?: HTMLElement;
  playedBg?: string;
  buffBg?: string;
  indicator?: boolean;
}

export interface IThumbnail {
  startSecond?: number;
  gapSecond?: number;
  row?: number;
  col?: number;
  width?: number;
  height?: number;
  images?: string[];
}

export interface IPlayerOptions {
  container?: HTMLElement | string;
  video?: HTMLVideoElement;
  src?: string;
  themeColor?: string;
  videoProps?: Record<string, any>;
  controller?: IController;
  progressOptions?: IProgressOptions;
  thumbnail?: IThumbnail;
  settings?: (ISettingItem | string)[];
}
