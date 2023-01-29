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
// 获取目前展示的日期
// 发送sql请求获取当页需要的日记列表
//  SELECT * FROM blocks WHERE hpath LIKE '%daily note%' AND type = 'd' AND content LIKE '%-__-%' AND content LIKE '2023-01%'

// 发送sql请求获取日记列表的详细信息：content: image span, subtype: h1,
//  SELECT * FROM blocks WHERE hpath LIKE '%daily note%' AND root_id = '20230117175253-prfgimc' OR root_id = 'xxx'

// 组件内部整理数据并渲染
//  整理数据[{
//   date: '2023-01-17',
//   title: 'xxx',
//   image: 'xxx',
//   tag: 'xxx',
//  }]
</script>

<style scoped></style>
