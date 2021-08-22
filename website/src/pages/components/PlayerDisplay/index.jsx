import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Player from 'qier-player';
import styles from './style.module.css';

export default function PlayerDisplay() {
  const ref = useRef();

  useEffect(() => {
    if (ref && ref.current) {
      const player = new Player({
        src: 'https://vortesnail.github.io/qier-player-demo/static/media/video480p.d116ba09.mp4',
      });
      player.mount(ref.current);
    }
  }, []);

  return (
    <section className={styles.playerDisplay}>
      <div className={styles.container} ref={ref}></div>
    </section>
  );
}
