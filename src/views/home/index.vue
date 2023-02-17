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
import { ref, toRefs } from 'vue';
import { Dayjs } from 'dayjs';
import SettingBtn from '/@/components/settingBtn/index.vue';
import { message } from 'ant-design-vue';
import { usePublicStore } from '/@/store/modules/public';
const publicStore = usePublicStore();
const { refreshDiaryList, refreshDiaryInitEvent } = publicStore;

const selectedDate = ref();
const calenderRef = ref();

// region 获取当页数据（防抖）

// endregion

const changeFn = async (date: Dayjs) => {
    console.log(`changeFn:${date}`);
    await refreshDiaryList();
    await refreshDiaryInitEvent();
};

const panelChangeFn = (date: Dayjs) => {
    console.log(`panelChangeFn:${date}`);
};

const { selectedNotebookId } = toRefs(publicStore);
const init = async () => {
    await refreshDiaryList().catch((e) => {
        console.log(e);
    });
    // 读取配置信息
    if (selectedNotebookId.value) {
        // 选择了笔记本
    } else {
        // 没有选择笔记本
        message.info(
            '检测到未选择笔记本，将自动查询出所有默认格式的日记进行展示哦~',
        );
    }
};

await init();
</script>

<style scoped></style>
