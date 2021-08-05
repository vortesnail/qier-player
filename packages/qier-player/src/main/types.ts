import { IControllerEle } from './modules/controller';

export interface IController {
  progress: (IControllerEle | string)[];
  eles: (IControllerEle | string)[];
}

export interface IProgressOptions {
  dot?: HTMLElement;
  playedBg?: string;
  buffBg?: string;
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
  videoProps?: Record<string, any>;
  controller?: IController;
  progressOptions?: IProgressOptions;
  thumbnail?: IThumbnail;
}
