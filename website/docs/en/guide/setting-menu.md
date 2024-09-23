# Settings Menu {#setting-menu}

The settings menu is part of the [controller](./controller) under `settings`.

Once you configure this item in the controller, you can customize and add settings menu items. The default configuration for the player is:

```js
new Player({
  settings: ['mirroring', 'speed'],
})
```

This means **Mirroring** and **Playback Speed** are included. If you prefer not to have them, you can remove them by adjusting the configuration array.

If you want to customize the settings, pay attention to the interface definition for setting items.

## Custom Settings Menu Items {#setting-menu-custom-menu-item}

```ts
interface ISettingItemOption<T = any> {
  html?: string // Display text for the option
  selectedText?: string // Text displayed when selected; if not provided, uses html
  value?: T // The value of this item
}

interface ISettingItem<T = any> {
  id?: any // Unique ID for the setting item
  html?: string // Display text for the setting item
  type?: 'switch' | 'select' // Type
  checked?: boolean // Whether it is selected
  options?: ISettingItemOption<T>[] // Options configuration
  value?: T // Currently selected value, corresponding to value in options
  init?: (player: Player, item: ISettingItem) => void // Initialization call
  change?: (value: T, player: Player, item: ISettingItem) => void // Called when the option changes
  [key: string]: any
}
```

`html` refers to the text displayed for the setting menu item; for example, the `html` for `speed` is “Playback Speed.”

Currently, there are two types of setting menu items: `switch` and `select`, each with different configuration requirements.

## Switch

The `switch` configuration uses `checked`. When the user clicks to change the value, the `change` function is called, with the first parameter being the new `checked` value. Notably, you don't need to manually toggle `checked` in the `change` function; it’s updated internally before `change` is called.

## Select

The `select` configuration utilizes `options`. Here’s a simple example of the built-in playback speed source code:

```js
const speedSettingItem = () => ({
  id: 'speed',
  type: 'select',
  html: 'Playback Speed',
  value: 1,
  options: [
    { value: 0.25, html: '0.25' },
    { value: 0.5, html: '0.5' },
    { value: 1, html: 'Normal' },
    { value: 1.5, html: '1.5' },
    { value: 2, html: '2' },
  ],
  init(player) {
    player.playbackRate = 1
  },
  change(value, player) {
    player.playbackRate = value
    this.value = value
  },
})
```

Isn’t it simple? 😊

## Registering and Accessing Settings Menu Items {#setting-menu-register-setting}

The `player` instance provides two methods to register and retrieve menu item objects.

### registerSettingItem(item: ISettingItem, id?: string)

Register a settings menu item.

### getSettingItem(id: string)

Retrieve a settings menu item.

```js
const player = new Player({ ... })
const speed = player.getSettingItem('speed')
console.log(speed)
```

## More Examples {#setting-menu-more-example}

- [Mirroring the Screen](./examples/mirroring)
