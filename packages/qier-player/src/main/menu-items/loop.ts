import { IMenuItem } from '@Src/main/modules/menu';
import { I18n, LOOP } from '../features/i18n';

export const loopMenuItem = (): IMenuItem => ({
  id: 'loop',
  html: I18n.trans(LOOP),
  show(player, item) {
    item.checked = player.loop;
  },
  click(player, item) {
    player.loop = !player.loop;
    item.checked = player.loop;
  },
});
