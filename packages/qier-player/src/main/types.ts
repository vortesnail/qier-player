import { IControllerEle } from './modules/controller';
import { ISettingItem } from './modules/controller/eles/settings';
import { IMenuItem } from './modules/menu';

export interface IPosterOptions {
  disabled?: boolean;
  url?: string;
  autoFill?: boolean;
  bgColor?: string;
}

export interface ILoadingOptions {
  disabled?: boolean;
  spinner?: HTMLElement;
  type?: 'wave' | 'circle';
}

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
  posterOptions?: IPosterOptions;
  loadingOptions?: ILoadingOptions;
  controller?: IController;
  progressOptions?: IProgressOptions;
  thumbnail?: IThumbnail;
  settings?: (ISettingItem | string)[];
  menus?: (IMenuItem | string)[];
  showDefaultMenu?: boolean;
}
