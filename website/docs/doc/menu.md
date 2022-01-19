---
title: Menu
order: 5
---

# Menu

When clicking the right mouse button on the player, a menu will appear to provide some convenient operations (or information display).

## Configs

The menu can be configured according to `menus` and `showDefaultMenu`, the default configuration is as follows:

```js
new Player({
  menus: ['loop'],
  showDefaultMenu: true,
});
```

- `menus` has only 1 menu item by default, which is **loop play**. When you manually set it to an empty array, the context menu will not appear.
- `showDefaultMenu` is used to determine whether to display the **native right-click menu**. When the value is `true`, the browser's native right-click menu will be displayed on the second click, instead of the player's right-click menu configured by ourselves. menu. When the value is `false`, the browser context menu will never be displayed.

## Custom menu items

The right-click menu supports custom menu items. The types of each menu item are as follows:

```typescript
interface IMenuItem {
  id?: string; // The unique id of the menu item
  html?: string; // Menu item text
  hidden?: boolean; // Is visible
  disabled?: boolean; // Is disabled
  checked?: boolean; // Is checked
  init?: (player: Player, item: IMenuItem) => void; // Will be called once during initialization
  show?: (player: Player, item: IMenuItem) => void; // Called every time the right-click menu is displayed
  click?: (player: Player, item: IMenuItem) => void; // Called each time the item is clicked
}
```

<Alert type="warning">
  The html attribute will directly insert the html string through innerHTML to generate the DOM. It will not undergo security processing. You need to ensure the security of the string yourself.
</Alert>

You can try to add a **Picture in Picture** function to get an initial experience developing your own menu items.

```js
const pip = {
  html: 'pip',
  init() {
    // Initialization is to determine whether the browser does not support picture-in-picture, and hide the menu item if it does not support it.
    this.hidden = !document.pictureInPictureEnabled;
  },
  show(player, item) {
    item.checked = document.pictureInPictureElement === player.video;
  },
  click(player, menuItem) {
    if (player.video.readyState < 3) return; // The video has not loaded successfully
    if (document.pictureInPictureElement !== player.video) {
      player.video.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
      menuItem.checked = false;
    }
    this.show(player, menuItem);
  },
};

new Player({
  menus: ['loop', pip],
});
```

In the above logic, we first define a menu item object, and then add it directly to the array during configuration, and you can adjust the order at will. At this time, you can right-click on the player to call out the menu, and you can see the "Picture in Picture" option.

<Alert type="success">
  If the currently exposed menu item interface cannot be satisfied in your development, please file an <a href="https://github.com/vortesnail/qier-player/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=">issue</a>。
</Alert>

## Register and get menu items

The `player` instance provides two methods to register and get menu item objects.

### Register

#### `registerMenuItem(item: IMenuItem, id?: string)`

Use this method to register menu items, and then use the `id` string to access, generally only used in custom plugins.

### Get menu item

#### `getMenuItem(id: string)`

Use this method to get the menu item with the specified `id`.

```js
const pip = { ... }
const player = new Player({ ... });
// Register
player.registerMenuItem(pip, 'pip');
// Get menu item
const pip = player.getMenuItem('pip');
// Update
if (pip) {
  pip.disabled = true;
  pip.html = 'Picture in Picture (disabled)';
}
```

You can change the configuration of the menu item at any time, and the configuration item will be updated the next time the right-click menu is displayed.

## More examples

- [Video screenshot](/doc/examples/video-screenshot)
