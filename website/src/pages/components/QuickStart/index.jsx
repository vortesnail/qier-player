import React from 'react';
import clsx from 'clsx';
import styles from './style.module.css';
import CodeBlock from '../../../components/CodeBlock';

const ins = `npm i qier-player --save
# or
yarn add qier-player`;

const code = `import Player from 'qier-player';

const player = new Player({
  src: "https://vortesnail.github.io/qier-player-demo/static/media/video480p.d116ba09.mp4",
});

player.mount(document.body);`;

export default function QuickStart() {
  return (
    <div className={styles.quickStart}>
      <div className={styles.content}>
        <div className={styles.title}>快速上手</div>
        <div>
          <div className={styles.tagline}>第一步：安装 NPlayer</div>
          <CodeBlock code={ins} language='bash' />
        </div>
        <div>
          <div className={styles.tagline}>第二步：使用 NPlayer</div>
          <CodeBlock code={code} />
        </div>
      </div>
    </div>
  );
}
