<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import CalendiaryHome from '/@/views/home/index.vue';
dayjs.locale('zh-cn');
</script>

<template>
    <a-config-provider :locale="zhCN">
        <suspense><calendiary-home /> </suspense
    ></a-config-provider>
</template>

<style scoped></style>
