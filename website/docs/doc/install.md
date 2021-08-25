---
title: Install
order: 2
---

# Install

## Package install

Use npm:

```bash
npm i qier-player --save
```

Or you prefer yarn:

```bash
yarn add qier-player
```

The following introduces the concentration in the code:

```js
import the player from'qier-player';

const player = new player ({
  src: 'your video address',
});

player.mount('#root');
```

## CDN Service

It is also possible to download the umd package through `script`, you only need to introduce the classification in the appropriate position in the html file.

```html
<script src="https://unpkg.com/qier-player@latest/dist/umd/index.min.js"></script>
```

In the usage mode, if you import through the CDN module, the modules you cannot export through ES will be different. The following is a simulation comparison.

- ES module

```js
import Player, { Icon, I18n } from 'qier-player';
```

- Global object

```js
const { Player, Icon, I18n } = window.QierPlayer;
```

When using CDN, we need to remove the locally installed `qier-player` package from the final package file by using a build tool (such as Webpack). We can maintain it in Webpack.

```js
external:{
  'qier-player':'QierPlayer',
},
```

## Suggest

During development, our first version will build applications based on React or Vue. In order to subcontract `qier-player`, we can destroy it.

1. Install the package to the local through yarn or npm, and you will get a good code prompt during development.

```bash
yarn add qier-player
# or
npm i qier-player --save
```

2. Indicate the CDN link.

```html
<script src="https://unpkg.com/qier-player@latest/dist/umd/index.min.js"></script>
```

3. Eaves the bag

```js
external:{
  'qier-player':'QierPlayer',
},
```
