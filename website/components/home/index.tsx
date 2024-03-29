import React, { useContext, useRef, useEffect } from 'react';
import Player from 'qier-player';
import './style.scss';
import { usePrefersColor, context } from 'dumi/theme';
import { Trans } from './trans';
import { featureItems } from './feature';
import Code from './Code';

export const prefix = 'qier-player';

const installCode = `npm i qier-player --save
#or
yarn add qier-player`;

const useCode = `import Player from 'qier-player;'

const player = new Player({
  src: "https://vortesnail.github.io/qier-player-demo/static/media/video480p.d116ba09.mp4",
});

player.mount(document.body);`;

const Home: any = () => {
  document.title = 'Qier Player | A features rich web video player';
  const { locale } = useContext(context);
  const [color] = usePrefersColor();
  // const locale = 'en-US';
  // const color = 'light';
  const localStr = locale === 'en-US' ? 'en-US' : 'zh-CN';
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref && ref.current) {
      const player = new Player({
        src: 'https://vortesnail.github.io/qier-player-demo/static/media/video480p.d116ba09.mp4',
        thumbnail: {
          col: 2,
          row: 2,
          startSecond: 0,
          gapSecond: 1,
          images: [
            'thumbnails/T1.jpg',
            'thumbnails/T2.jpg',
            'thumbnails/T3.jpg',
            'thumbnails/T4.jpg',
            'thumbnails/T5.jpg',
          ],
        },
      });
      player.mount(ref.current);
    }
  }, []);

  return (
    <section className="home-page">
      <div className="banner">
        <div className="content">
          <p className={`title ${color}`}>{Trans[localStr].title}</p>
          <p className="description">{Trans[localStr].des}</p>
          <div className="buttons">
            <div className={`btn quick-start ${color}`}>
              <a
                className={color}
                href={`/${prefix}${
                  locale === 'en-US' ? '/' : '/zh-CN/'
                }doc/quick-start`}
              >
                <span>{Trans[localStr].start}</span>
              </a>
            </div>
            <div className={`btn github ${color}`}>
              <a
                className={color}
                href="https://github.com/vortesnail/qier-player"
                target="_blank"
              >
                <svg
                  className="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="12019"
                >
                  <defs>
                    <style type="text/css"></style>
                  </defs>
                  <path
                    d="M960 512c0 97.76-28.704 185.216-85.664 263.264-56.96 78.016-130.496 131.84-220.64 161.856-10.304 1.824-18.368 0.448-22.848-4.032a22.4 22.4 0 0 1-7.2-17.504v-122.88c0-37.632-10.304-65.44-30.464-82.912a409.856 409.856 0 0 0 59.616-10.368 222.752 222.752 0 0 0 54.72-22.816c18.848-10.784 34.528-23.36 47.104-38.592 12.544-15.232 22.848-35.904 30.912-61.44 8.096-25.568 12.128-54.688 12.128-87.904 0-47.072-15.232-86.976-46.208-120.16 14.368-35.456 13.024-74.912-4.48-118.848-10.752-3.616-26.432-1.344-47.072 6.272s-38.56 16.16-53.824 25.568l-21.984 13.888c-36.32-10.304-73.536-15.232-112.096-15.232s-75.776 4.928-112.096 15.232a444.48 444.48 0 0 0-24.672-15.68c-10.336-6.272-26.464-13.888-48.896-22.432-21.952-8.96-39.008-11.232-50.24-8.064-17.024 43.936-18.368 83.424-4.032 118.848-30.496 33.632-46.176 73.536-46.176 120.608 0 33.216 4.032 62.336 12.128 87.456 8.032 25.12 18.368 45.76 30.496 61.44 12.544 15.68 28.224 28.704 47.072 39.04 18.848 10.304 37.216 17.92 54.72 22.816a409.6 409.6 0 0 0 59.648 10.368c-15.712 13.856-25.12 34.048-28.704 60.064a99.744 99.744 0 0 1-26.464 8.512 178.208 178.208 0 0 1-33.184 2.688c-13.024 0-25.568-4.032-38.144-12.544-12.544-8.512-23.296-20.64-32.256-36.32a97.472 97.472 0 0 0-28.256-30.496c-11.232-8.064-21.088-12.576-28.704-13.92l-11.648-1.792c-8.096 0-13.92 0.928-17.056 2.688-3.136 1.792-4.032 4.032-2.688 6.72s3.136 5.408 5.376 8.096 4.928 4.928 7.616 7.168l4.032 2.688c8.544 4.032 17.056 11.232 25.568 21.984 8.544 10.752 14.368 20.64 18.4 29.6l5.824 13.44c4.928 14.816 13.44 26.912 25.568 35.872 12.096 8.992 25.088 14.816 39.008 17.504 13.888 2.688 27.36 4.032 40.352 4.032s23.776-0.448 32.288-2.24l13.472-2.24c0 14.784 0 32.288 0.416 52.032 0 19.744 0.48 30.496 0.48 31.392a22.624 22.624 0 0 1-7.648 17.472c-4.928 4.48-12.992 5.824-23.296 4.032-90.144-30.048-163.68-83.84-220.64-161.888C92.256 697.216 64 609.312 64 512c0-81.152 20.192-156.064 60.096-224.672s94.176-122.88 163.232-163.232C355.936 84.192 430.816 64 512 64s156.064 20.192 224.672 60.096 122.88 94.176 163.232 163.232C939.808 355.488 960 430.848 960 512"
                    p-id="12020"
                  ></path>
                </svg>
                <span>{Trans[localStr].github}</span>
              </a>
            </div>
          </div>
          <div className="logo-auto">
            <img src={`/${prefix}/img/logo.svg`} alt="" />
          </div>
        </div>
      </div>
      <div className={`features ${color}`}>
        <div className="bg"></div>
        <div className="white-bg"></div>
        <div className="inner-wrapper">
          {featureItems(locale as any).map((item) => (
            <div className="item-wrapper" key={item.id}>
              <div className="url">
                <img src={`/${prefix}${item.url}`} alt="" />
              </div>
              <p className="title">{item.title}</p>
              <p className="des">{item.des}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="player-wrapper">
        <div className="container" ref={ref}></div>
      </div>
      <div className={`quick-start-wrapper ${color}`}>
        <p className="title">{Trans[localStr].quickStart}</p>
        <p className="step-des">{Trans[localStr].install}</p>
        <Code code={installCode} language="bash" />
        <p className="step-des">{Trans[localStr].use}</p>
        <Code code={useCode} />
      </div>
      <footer className="footer">
        <p className="copy-right">Copyright © 2021 vortesnail ❤️</p>
      </footer>
    </section>
  );
};

export default Home;
