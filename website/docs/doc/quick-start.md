---
title: Getting Started
order: 3
---

# Getting Started

## Install

Through the [installation chapter](/doc/install), everyone should know various installation methods. Now suppose we introduce it based on ES Module.

```bash
yarn add qier-player
# or
npm i qier-player --save
```

## Getting Started

```js
import Player from 'qier-player';

const player = new Player({
  src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
});

// player.mount('#root');
player.mount(document.body);
```

First we import `Player`, create an instance, then pass in the video address, call the `mount` method to mount it under the `body` element.

The `mount` method can mount the DOM element actually produced by the player to the specified DOM element. It receives a parameter, which can be a string (selector) or an actual DOM element. When it is a string, the internal implementation finds the actual DOM element through the `document.querySelector` method.

## Get related DOM elements

After the `mount` method is executed, the internal members can be accessed through the instance, the following may be frequently accessed:

- **Mounted elements**：Accessible via `container`.
- **Player root element**：Accessible via `el`.
- **video**：Accessible via `video`.

```js
import Player from 'qier-player';

const player = new Player({
  src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
});

player.mount(document.body);

console.log(player.container); // document.body
console.log(player.el);
console.log(player.video);
```

## Instance properties and methods

After we create a new instance of `player`, there are many member attributes for us to read.

For example, the following code can realize automatic playback, and automatically pause after `10` seconds.

```js
player.muted = true;
player.play();

setTimeout(() => {
  player.pause();
}, 10000);
```

If we print the `player` instance on the console, you will find many member attributes after expansion. For details, please click on the [attributes](/api/property) and [functions](/api/functions) to view.

## Event monitoring

`player` has methods related to the following 5 events.

| Methods                           | description                                         |
| --------------------------------- | --------------------------------------------------- |
| emit(evt: string, ...args: any[]) | Dispatch event                                      |
| on(evt: string, fn?: Function)    | Events listener                                     |
| once(evt: string, fn?: Function)  | Events listener, callback function only excute once |
| off(evt: string, fn?: Function)   | Unregister event listener                           |
| removeAllListeners(evt?: string)  | Unregister all events                               |

You can use these methods to listen for built-in events.

```js
import Player, { EVENT } form 'qier-player';

const player = new Player();

player.on(EVENT.PLAY, () => {
  console.log('Start playing');
});
```

`EVENT.PLAY` is essentially a string, using the big hump naming method as `Play`.

You can also customize the monitoring event.

```js
import Player, { EVENT } form 'qier-player';

const player = new Player();

player.emit('CustomEvent');
player.on('CustomEvent', () => {
  console.log('Custom event has been triggered');
});
```

For more built-in events, please see [events](/api/events).

## Destroy

`player` and all components implement the `Dispose` interface, that is, have the `dispose` method, calling this method will destroy the object and its DOM elements.

```js
player.mount(document.body);
// Destroy the player and its DOM elements after 5 seconds
setTimeout(() => player.dispose(), 5000);
```

## Multi-level

The player is composed of 6 levels with different functions, and each level has its own `z-index`.

| Level      | z-indx | Description                                                          |
| ---------- | ------ | -------------------------------------------------------------------- |
| video      | -      | The video element has no z-index set                                 |
| poster     | 10     | Video poster                                                         |
| loading    | 20     | The loading indicator element that appears when the video is loading |
| controller | 30     | Video bottom control bar                                             |
| menu       | 40     | Right-click the pop-up menu of the video element                     |
| toast      | 50     | Toast                                                                |

Except for the `video` element, all other functional components adopt **absolute position**. After the plugin function is provided later, the developer can decide to set the `z-index` to an appropriate value to avoid unnecessary occlusion.

## Issues & New Features

If you encounter a BUG, ​​want a new feature, or have a problem with use, welcome to initiate [issue](https://github.com/vortesnail/qier-player/issues/new/choose)。
