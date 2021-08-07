import { addClass, createSvg } from '@Src/main/utils/dom';

const play = 'M6 2.914v18.172L20.279 12 6 2.914z';
const pause = 'M14.333 20.133H19V3.8h-4.667M5 20.133h4.667V3.8H5v16.333z';
const volume =
  'M14,3.23V5.29C16.89,6.15 19,8.83 19,12C19,15.17 16.89,17.84 14,18.7V20.77C18,19.86 21,16.28 21,12C21,7.72 18,4.14 14,3.23M16.5,12C16.5,10.23 15.5,8.71 14,7.97V16C15.5,15.29 16.5,13.76 16.5,12M3,9V15H7L12,20V4L7,9H3Z';
const muted =
  'M3,9H7L12,4V20L7,15H3V9M16.59,12L14,9.41L15.41,8L18,10.59L20.59,8L22,9.41L19.41,12L22,14.59L20.59,16L18,13.41L15.41,16L14,14.59L16.59,12Z';

function createIcon(icon: string) {
  return (cls?: string) => {
    const svg = createSvg('icon', icon);
    if (cls) addClass(svg, cls);
    return svg;
  };
}

const Icon: {
  register: typeof registerIcon;
} & {
  [key: string]: <T extends Element>(cls?: string) => T;
} = Object.create(null);

function registerIcon(iconName: string, icon: (cls?: string) => any): void {
  Icon[iconName] = icon;
}

Object.defineProperty(Icon, 'register', { value: registerIcon });

registerIcon('play', createIcon(play));
registerIcon('pause', createIcon(pause));
registerIcon('volume', createIcon(volume));
registerIcon('muted', createIcon(muted));

export { Icon };
