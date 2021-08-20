// eslint-disable-next-line import/no-unresolved
import React, { useEffect, useRef, memo } from 'react';
import { Player as P, IPlayerOptions } from 'qier-player';

console.log(P);

export type PlayerProps = {
  options?: IPlayerOptions;
  style?: Partial<CSSStyleDeclaration>;
  className?: string;
};

const Player = React.forwardRef<P, PlayerProps>((props = {}, ref) => {
  const divRef = useRef<HTMLDivElement>();
  const playerRef = useRef<P>();
  const { options, ...rest } = props;

  useEffect(() => {
    if (!divRef.current || typeof document === 'undefined') return;
    if (!playerRef.current) {
      playerRef.current = new P(options);
    }

    playerRef.current.mount(divRef.current);

    if (typeof ref === 'function') {
      if (playerRef.current) ref(playerRef.current);
    } else if (ref) ref.current = playerRef.current;

    return () => {
      if (playerRef.current) playerRef.current.dispose();
    };
  }, [ref]);

  return React.createElement('div', { ...rest, style: { width: '100%', height: '100%', ...rest.style }, ref: divRef });
});

Player.displayName = 'Player';

export default memo(Player);
