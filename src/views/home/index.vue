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
</template>

<script setup lang="ts">
import DiaryCard from '/@/components/diaryCard/index.vue';
import { onMounted, ref } from 'vue';
import { Dayjs } from 'dayjs';

const selectedDate = ref();
const calenderRef = ref();
onMounted(() => {
    // console.log(calenderRef.value);
});

// region 获取当页数据（防抖）

// endregion

const changeFn = (date: Dayjs) => {
    console.log(`changeFn:${date}`);
};

const panelChangeFn = (date: Dayjs) => {
    console.log(`panelChangeFn:${date}`);
};

// TODO 从保存在本页的配置文件中读取配置
</script>

<style scoped></style>
