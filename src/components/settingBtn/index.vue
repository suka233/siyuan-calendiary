<template>
    <setting-popover>
        <setting-outlined class="setting-btn" />
    </setting-popover>
</template>

<script lang="ts">
export default {
    name: 'SettingBtn',
};
</script>

<script setup lang="ts">
import { SettingOutlined } from '@ant-design/icons-vue';
import SettingPopover from './components/settingPopover/index.vue';
</script>

<style scoped>
.setting-btn {
    @apply fixed right-10 bottom-10 rounded-1/2 w-12 h-12 bg-gray-200 text-gray-600 text-center text-4xl cursor-pointer leading-14 hover:bg-gray-300 hover:shadow-lg transition-all duration-500;
}
</style>
