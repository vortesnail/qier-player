import { IControllerEle } from './modules/controller';

export interface IController {
  progress: (IControllerEle | string)[];
  eles: (IControllerEle | string)[];
}

export interface IPlayerOptions {
  container?: HTMLElement | string;
  video?: HTMLVideoElement;
  src?: string;
  videoProps?: Record<string, any>;
  controller?: IController;
}
