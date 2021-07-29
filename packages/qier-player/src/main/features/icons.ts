import { addClass, createSvg } from '@Src/main/utils/dom';

const play = 'M6 2.914v18.172L20.279 12 6 2.914z';
const pause = 'M14.333 20.133H19V3.8h-4.667M5 20.133h4.667V3.8H5v16.333z';

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

export { Icon };
