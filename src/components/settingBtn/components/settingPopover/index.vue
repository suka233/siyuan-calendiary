<template>
    <a-popover trigger="click" placement="topRight">
        <template #title>
            <p class="font-bold w-10rem truncate">设置</p>
        </template>
        <template #content>
            <a-button type="primary" @click="refreshFn">刷新</a-button>
        </template>
        <template v-for="k in Object.keys($slots)" #[k] :key="k">
            <slot :name="k"></slot>
        </template>
    </a-popover>
</template>

<script lang="tsx">
export default {
    name: 'SettingPopover',
};
</script>

<script setup lang="tsx">
import { usePublicStore } from '/@/store/modules/public';
const publicStore = usePublicStore();
const { refreshDiaryList, refreshDiaryInitEvent } = publicStore;

const refreshFn = async () => {
    await refreshDiaryList();
    await refreshDiaryInitEvent();
};
</script>

<style scoped></style>
