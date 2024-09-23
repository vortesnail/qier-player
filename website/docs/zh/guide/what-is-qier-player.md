# QierPlayer 是什么？ {#what-is-qier-player}

`QierPlayer` 是一个简单易用的 h5 播放器，支持 UI 高度定制化、功能丰富的现代 web 播放器。本项目由 Typescript 编写，具备良好的类型提示；在未来会逐步开发更多特性，比如弹幕作为插件接入，兼容移动端等。

<div class="tip custom-block" style="padding-top: 8px">

只是想尝试一下？跳到[快速开始](./getting-started)。

</div>

<script setup>
import Demo from '../../.vitepress/theme/components/Demo.vue'
</script>

<ClientOnly>
  <Demo :simple="true"/>
</ClientOnly>

<div class="warning custom-block" style="padding-top: 8px">

qier-player 的名字由来是一个在这个世界上很美好的女孩的名字中带有“琪”字，亲昵的称呼“琪儿”。

</div>

## 特性 {#features}

- 📦 开箱即用，免去大部分 ui 的样式编写，功能齐全。
- 🚄 已开发弹幕库，快速接入播放器。
- 🛡 使用 TypeScript 开发，提供完整的类型定义文件。
- 📃 主题轻松自定义，替换原有的图标、主题色非常简单。
- 🔖 支持国际化，简单的 api 调用即可注册你的语言。

## 未来计划 {#future-plans}

目前该项目还有许多需要做的功能，目前想到的有以下：

- **设计插件接入机制**：支持用户自定义插件接入。
- **移动端适配**：这是一个细心活儿。
- **修复各种小问题**：比如弹幕在视频全屏或者调整尺寸后，发射的位置不对等。
