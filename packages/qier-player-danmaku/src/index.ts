import { Player, IPlayerOptions } from 'qier-player';

export type PlayerProps = {
  options?: IPlayerOptions;
  style?: Partial<CSSStyleDeclaration>;
  className?: string;
};
