# Installation {#installation}

In general, for local development, having good type hints is essential, and installing the ESM package is the better choice.

## Package Installation {#esm-installation}

ESM package installation:

::: code-group

```sh [npm]
$ npm install qier-player
```

```sh [pnpm]
$ pnpm install qier-player
```

```sh [yarn]
$ yarn add qier-player
```

:::

Next, simply import it in your code:

```js
import Player from 'qier-player'

const player = new Player({
  src: 'your video URL',
})

player.mount('#root')
```

## CDN Service {#cdn-link}

You can also download the UMD package via a `script` tag by including it in the appropriate place in your HTML file.

```html
<script src=""></script>
```

When using the CDN method, if you do not import via ES Module, the way you access the exported module will differ. Here’s a comparison of the two.

- ES Module Import

```js
import Player, { Icon, I18n } from 'qier-player'
```

- Global Object Import

```js
const { Player, Icon, I18n } = window.QierPlayer
```

Generally, when using a CDN, you’ll need to exclude the locally installed `qier-player` package from the final bundle if you’re using a build tool like Webpack. You can do this in Webpack as follows.

```js
externals: {
  'qier-player': 'QierPlayer',
},
```

::: warning
The above is a free CDN link, which may sometimes be inaccessible. It’s recommended to download the UMD file locally and upload it to your own server or use your own CDN service.
:::

## Recommendations {#suggestion}

During development, we usually build applications based on React or Vue. To bundle `qier-player`, we can follow these steps.

1. Install the package locally using yarn or npm for better code hints.

```bash
yarn add qier-player
# or
npm i qier-player --save
```

2. Include the online (CDN) link.

```html
<script src=""></script>
```

3. Exclude the package

```js
externals: {
  'qier-player': 'QierPlayer',
},
```
