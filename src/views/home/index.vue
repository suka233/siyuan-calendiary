<template>
    <a-calendar
        ref="calenderRef"
        v-model:value="selectedDate"
        @change="changeFn"
        @panel-change="panelChangeFn"
    >
        <!--        <template #dateCellRender="{ current }">-->
        <!--            <diary-card :current="current" />-->
        <!--        </template>-->
        <template #dateFullCellRender="{ current }">
            <diary-card :current="current" />
        </template>
        <!--        <template #headerRender="{ value }">-->
        <!--            {{ value }}-->
        <!--        </template>-->
    </a-calendar>
    <setting-btn></setting-btn>
</template>

<script lang="ts">
export default {
    name: 'CalendiaryHome',
};
</script>

<script setup lang="ts">
import DiaryCard from '/@/components/diaryCard/index.vue';
import { ref } from 'vue';
import { Dayjs } from 'dayjs';
import SettingBtn from '/@/components/settingBtn/index.vue';
import { getWidgetBlockInfo } from '/@/utils';
import { message } from 'ant-design-vue';
import { usePublicStore } from '/@/store/modules/public';
const publicStore = usePublicStore();
const { refreshDiaryList } = publicStore;

const selectedDate = ref();
const calenderRef = ref();

// region 获取当页数据（防抖）

// endregion

const changeFn = (date: Dayjs) => {
    console.log(`changeFn:${date}`);
};

const panelChangeFn = (date: Dayjs) => {
    console.log(`panelChangeFn:${date}`);
};

const init = async () => {
    // 读取配置信息
    const { selectedNotebookId } = getWidgetBlockInfo();
    if (selectedNotebookId) {
        // 选择了笔记本
    } else {
        // 没有选择笔记本
        message.info(
            '检测到未选择笔记本，将自动查询出所有默认格式的日记进行展示哦~',
        );
    }

    await refreshDiaryList().catch((e) => {
        console.log(e);
    });
};

await init();
</script>

<style scoped></style>
