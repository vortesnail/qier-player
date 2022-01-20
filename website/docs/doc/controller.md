---
title: Controller
order: 6
---

# Controller

At the bottom of the player, there are a series of control items for users to perform operations such as play (pause), volume adjustment, full screen, etc., and also include a playback progress bar.

## Configs

You can configure the position of each item of the controller, whether to render it, etc. through the `controller` parameter. It is an object that contains `progress` and `eles` two configurable items, the former is **progress bar**, the latter Yes **General Controls**, you can add new control items by yourself.

The default settings are as follows:

```js
new Player({
  controller: {
    progress: ['progress'],
    eles: ['play', 'time', 'spacer', 'volume', 'settings', 'web-fullscreen', 'fullscreen'],
  },
});
```

The array in the above code is filled with the `id` of each built-in control, and their position in the array determines their position on the view.

What's special is that the `id` is the `spacer` control, which can divide the control into two parts. For example, to put the volume buttons to the left, just put the `volume` string to the left of the `spacer`.

```js
eles: ['play', 'time',  'volume', 'spacer', 'settings', 'web-fullscreen', 'fullscreen'],
```

## Built-in controls

| Control id     | Description                                                      |
| -------------- | ---------------------------------------------------------------- |
| progress       | Video progress bar                                               |
| play           | play/pause                                                       |
| time           | Video time display                                               |
| spacer         | Used to divide the control item layout into left and right parts |
| volume         | volume adjustment                                                |
| settings       | settings                                                         |
| web-fullscreen | Web fullscreen                                                   |
| fullscreen     | full screen                                                      |

## Custom control

控制项是可以自定义的，：

```typescript
interface IControllerEle {
  el: HTMLElement; // DOM element of the control
  id?: any; // the unique id of the control
  tip?: string; // the tip string for the control
  tooltip?: Tooltip; // Prompt component object
  mounted?: boolean; // Whether the control has been mounted
  init?: (player: Player, tooltip: Tooltip) => void; // Called when the control is initialized
  dispose?: () => void; // destroy
  [key: string]: any;
}
```

The `tip` parameter is a string that will be displayed when the mouse is over the corresponding control.

```js
const control = {
  id: 'control',
  tip: 'control',
  init(player) {
    const textDom = document.createElement('span');
    textDom.innerText = 'control';
    this.el.appendChild(textDom);
  },
};
```

## Update control item

Provides the built-in method `updateControllerEles()` to dynamically update control bar items.

```js
const player = new Player({ ... })

player.updateControllerEles(['play', 'spacer', 'settings'], 'eles')
```

The first parameter is the new control item array, and the second parameter is the configuration item to be updated, here is `eles`, which is the configuration of the control bar at the bottom.

## Register and get control items

The `player` instance provides two methods to register and get menu item objects.

### register

#### `registerControllerEle(ele: IControllerEle, id?: string)`

Use this method to register controls, and then use the `id` string to access, generally only used in custom plugins.

### Obtain

#### `getControllerEle(id: string)`

Use this method to get the control with the specified `id`.

```js
const control = { ... }
const player = new Player({ ... });
// register
player.registerControllerEle(control, 'control');
// Obtain
const controlTmp = player.getControllerEle('control');

if (controlTmp) {
  console.log(controlTmp)
}
```

The above is to register our own defined control items, and we can also get built-in control items, such as the playback class instance.

```js
console.log(player.getControllerEle('play'));
```

⚠️ Among them, the `spacer` control item is special, and its instance cannot be obtained through `getControlItem('spacer')`.

## More examples

- [Quality Switch](/doc/examples/quality-switch)
