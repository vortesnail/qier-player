# What is QierPlayer? {#what-is-qier-player}

`QierPlayer` is a simple and easy-to-use h5 player, supporting highly customizable UI and rich features of a modern web player. This project is written in Typescript, providing good type hints; more features will be gradually developed in the future, such as integrating bullet screen as a plugin and mobile compatibility.

<div class="tip custom-block" style="padding-top: 8px">

Just want to give it a try? Jump to [Getting Started](./getting-started).

</div>

<script setup>
import Demo from '../../.vitepress/theme/components/Demo.vue'
</script>

<ClientOnly>
  <Demo :simple="true"/>
</ClientOnly>

<div class="warning custom-block" style="padding-top: 8px">

The name of qier-player comes from a beautiful girl's name in this world with the character "qi", affectionately called "qier".

</div>

## Features {#features}

- 📦 Out-of-the-box, eliminating the need for most UI style writing, fully functional.
- 🚄 Developed danmaku library, quickly integrate with the player.
- 🛡 Developed using TypeScript, providing complete type definition files.
- 📃 Easily customize themes, replacing original icons and theme colors is very simple.
- 🔖 Supports internationalization, simply call the API to register your language.

## Future Plans {#future-plans}

There are still many features that need to be implemented in this project. Some ideas for the future include:

- **Design Plugin Integration Mechanism**: Support user-defined plugin integration.
- **Mobile Adaptation**: This requires attention to detail.
