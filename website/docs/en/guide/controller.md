# Controller {#controller}

At the bottom of the player, there is a set of controls for users to play (pause), adjust volume, toggle fullscreen, and more, including a playback progress bar.

## Configuration {#controller-settings}

You can configure the position and visibility of each control using the `controller` parameter. It’s an object containing two configurable items: `progress` for the **progress bar** and `eles` for **standard controls**, where you can customize and add new controls.

The default settings are as follows:

```js
new Player({
  controller: {
    progress: ['progress'],
    eles: ['play', 'time', 'spacer', 'volume', 'settings', 'web-fullscreen', 'fullscreen'],
  },
})
```

::: danger Important!
The arrays in the code above contain the `id` of each built-in control, and their position in the array determines their order in the view.
:::

Notably, the control with the `id` of `spacer` can split controls into two sections. For example, to move the volume button to the left, simply place the `volume` string before `spacer`.

```js
eles: ['play', 'time', 'volume', 'spacer', 'settings', 'web-fullscreen', 'fullscreen'],
```

## Built-in Controls {#controller-default-settings}

| Control ID      | Description                     |
| --------------- | ------------------------------- |
| progress        | Video progress bar              |
| play            | Play/Pause                      |
| time            | Video time display              |
| spacer          | Divides control layout into two parts |
| volume          | Volume adjustment               |
| settings        | Settings                        |
| web-fullscreen  | Web fullscreen                  |
| fullscreen      | Fullscreen                      |

## Custom Controls {#controller-custom-controller-item}

Controls can be customized:

```ts
interface IControllerEle {
  el: HTMLElement // DOM element of the control
  id?: any // Unique ID for the control
  tip?: string // Tooltip string for the control
  tooltip?: Tooltip // Tooltip component object
  mounted?: boolean // Whether the control is mounted
  init?: (player: Player, tooltip: Tooltip) => void // Called during initialization
  dispose?: () => void // Cleanup
  [key: string]: any
}
```

The `tip` parameter is a string that displays as a tooltip when hovering over the corresponding control.

```js
const control = {
  id: 'control',
  tip: 'Control Item',
  init(player) {
    const textDom = document.createElement('span');
    textDom.innerText = 'Ctrl';
    this.el.appendChild(textDom);
  },
}
```

## Update Controls {#controller-update-controller-item}

The built-in method `updateControllerEles()` allows for dynamic updates to the control items.

```js
const player = new Player({ ... })

player.updateControllerEles(['play', 'spacer', 'settings'], 'eles')
```

The first parameter is the new array of control items, and the second parameter is the configuration to update, here being `eles`, which refers to the bottom control bar.

## Registering and Retrieving Controls {#controller-register-get-controller-item}

The `player` instance provides two methods to register and retrieve control item objects.

### Register {#controller-register-controller-item}

#### `registerControllerEle(ele: IControllerEle, id?: string)`

Use this method to register a control item, then access it using the `id` string, typically done in custom plugins.

### Retrieve {#controller-get-controller-item}

#### `getControllerEle(id: string)`

Use this method to retrieve the control item with the specified `id`.

```js
const control = { ... }
const player = new Player({ ... })
// Register
player.registerControllerEle(control, 'control')
// Retrieve
const controlTmp = player.getControllerEle('control');

if (controlTmp) {
  console.log(controlTmp);
}
```

This allows you to register your custom control item and also retrieve built-in controls, such as the play instance.

```js
console.log(player.getControllerEle('play'));
```

::: warning Warning
The `spacer` control item is special; you cannot retrieve its instance with `getControlItem('spacer')`.
:::

## More Examples {#controller-more-examples}

- [Quality Switch](./examples/quality-switch)
