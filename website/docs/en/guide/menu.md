# Right-Click Menu {#menu}

When you right-click on the player, a menu appears that provides convenient actions (or information display).

## Configuration {#menu-property}

You can configure the menu using `menus` and `showDefaultMenu`, with the default configuration as follows:

```js
new Player({
  menus: ['loop'],
  showDefaultMenu: true,
})
```

- `menus` has a default single menu item, which is **Loop Playback**. If you manually set it to an empty array, the right-click menu will not appear.
- `showDefaultMenu` determines whether to display the **native right-click menu**. When set to `true`, the browser's native right-click menu will show on the second click instead of our configured player menu. When set to `false`, the browser's right-click menu will never be displayed.

## Custom Menu Items {#custom-menu-item}

The right-click menu supports custom menu items. Each menu item type is as follows:

```typescript
interface IMenuItem {
  id?: string // Unique ID for the menu item
  html?: string // Text for the menu item
  hidden?: boolean // Whether the item is visible
  disabled?: boolean // Whether the item is disabled
  checked?: boolean // Whether the item is checked
  init?: (player: Player, item: IMenuItem) => void // Called once during initialization
  show?: (player: Player, item: IMenuItem) => void // Called every time the right-click menu is displayed
  click?: (player: Player, item: IMenuItem) => void // Called every time the item is clicked
}
```

::: warning
The `html` property directly inserts an HTML string to generate DOM via innerHTML, without security processing. Ensure the string's safety yourself.
:::

You can try adding a **Picture-in-Picture** feature to get started on developing your own menu items.

```js
const pip = {
  html: 'Picture-in-Picture',
  init() {
    // During initialization, check if the browser does not support Picture-in-Picture, and hide the menu item if unsupported
    this.hidden = !document.pictureInPictureEnabled
  },
  show(player, item) {
    item.checked = document.pictureInPictureElement === player.video
  },
  click(player, menuItem) {
    if (player.video.readyState < 3) return // Video has not loaded successfully yet
    if (document.pictureInPictureElement !== player.video) {
      player.video.requestPictureInPicture()
    } else {
      document.exitPictureInPicture()
      menuItem.checked = false
    }
    this.show(player, menuItem)
  },
}

new Player({
  menus: ['loop', pip],
})
```

In the above logic, we first define a menu item object and then add it directly to the configuration array. You can adjust the order freely. When you right-click on the player, you will see the `Picture-in-Picture` option.

::: warning Need More Features?
If the currently exposed menu item interface does not meet your development needs, feel free to open an <a href="https://github.com/vortesnail/qier-player/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=">issue</a>.
:::

## Registering and Accessing Menu Items {#register-get-menu-item}

The `player` instance provides two methods to register and access menu item objects.

### Registering {#register-menu-item}

#### `registerMenuItem(item: IMenuItem, id?: string)`

Use this method to register a menu item, and then access it using the `id` string. This is typically used only in custom plugins.

### Accessing {#get-menu-item}

#### `getMenuItem(id: string)`

Use this method to get the menu item with the specified `id`.

```js
const pip = { ... }
const player = new Player({ ... })
// Register
player.registerMenuItem(pip, 'pip')
// Access
const pipTmp = player.getMenuItem('pip')
// Modify
if (pipTmp) {
  pipTmp.disabled = true
  pipTmp.html = 'Picture-in-Picture (Disabled)'
}
```

You can change the menu item's configuration at any time; it will update the next time the right-click menu is displayed.

## More Examples {#menu-more-example}

- [Video Screenshot](./examples/video-screenshot)
