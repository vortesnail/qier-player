<template>
  <div :class="['outer']">
    <h2 class="title">{{ TITLE_MAP[lang].teamTitle }}</h2>
    <div :class="['content']">
      <VPTeamMembers size="small" :members="members" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, withDefaults } from 'vue';
import { useData } from 'vitepress';
import { VPTeamMembers } from 'vitepress/theme'

const TITLE_MAP = {
  'zh-CN': {
    teamTitle: '团队成员'
  },
  'en-US': {
    teamTitle: 'Meet the team'
  },
};

const members = [
  {
    avatar: 'https://www.github.com/vortesnail.png',
    name: 'Vortesnail',
    title: 'QierPlayer Creator',
    links: [
      { icon: 'github', link: 'https://github.com/vortesnail' },
    ]
  },
];

const { isDark, lang } = useData();

</script>

<style scoped>
.outer {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.outer.simple {
  margin: 0;
}

.title {
  margin: 48px 0 16px;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 24px;
  letter-spacing: -0.02em;
  line-height: 32px;
  font-size: 24px;
}

.content {
  width: 100%;
  padding: 40px 0;
  display: flex;
  justify-content: center;
}
</style>
