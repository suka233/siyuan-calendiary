<template>
    <a-popover v-model:visible="visible" trigger="click" placement="topRight">
        <template #title>
            <div class="w-12rem advance-setting">
                <span class="font-bold text-xl"> 快捷设置 </span>
                <a
                    class="text-xs text-blue-800 float-right advance-setting"
                    @click.prevent="
                        settingDrawerVisible = true;
                        visible = false;
                    "
                    >高级设置>>
                </a>
                <setting-drawer
                    v-model:visible="settingDrawerVisible"
                ></setting-drawer>
            </div>
        </template>
        <template #content>
            <div class="text-center h-200px">
                <span>请选择要展示的笔记本</span>
                <br />
                <box-selector class="w-full mt-3"></box-selector>
                <br />
            </div>
            <div class="action-btn flex">
                <a-button type="primary" @click="refreshFn">刷新</a-button>
                <a-button type="primary" @click="visible = false"
                    >关闭</a-button
                >
            </div>
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
import BoxSelector from './components/BoxSelector/index.vue';
import SettingDrawer from '../settingDrawer/index.vue';
import { ref } from 'vue';

const publicStore = usePublicStore();
const { refreshDiaryList, refreshDiaryInitEvent } = publicStore;
const refreshFn = async () => {
    await refreshDiaryList();
    await refreshDiaryInitEvent();
};

const visible = ref(false);
const settingDrawerVisible = ref(false);
</script>

<style scoped>
.action-btn {
    justify-content: space-around;
}
.advance-setting {
    vertical-align: bottom;
}
</style>
