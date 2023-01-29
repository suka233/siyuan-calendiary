<template>
    <a-popover placement="topRight" title="设置">
        <template #content>
            <a-button type="primary" @click="refreshFn">刷新</a-button>
        </template>
        <setting-outlined class="setting-btn" @click="showSettingPanelFn" />
    </a-popover>
</template>

<script lang="ts">
export default {
    name: 'SettingBtn',
};
</script>

<script setup lang="ts">
import { ref } from 'vue';
import { SettingOutlined } from '@ant-design/icons-vue';
import { usePublicStore } from '/@/store/modules/public';
const publicStore = usePublicStore();
const { refreshDiaryList, refreshDiaryInitEvent } = publicStore;

const showSettingPanel = ref(false);
const showSettingPanelFn = () => {
    showSettingPanel.value = true;
};

const refreshFn = async () => {
    await refreshDiaryList();
    await refreshDiaryInitEvent();
};
</script>

<style scoped>
.setting-btn {
    @apply absolute right-10 bottom-10 rounded-1/2 w-12 h-12 bg-gray-200 text-gray-600 text-center text-4xl cursor-pointer leading-14 hover:bg-gray-300 hover:shadow-lg transition-all duration-500;
}
</style>
