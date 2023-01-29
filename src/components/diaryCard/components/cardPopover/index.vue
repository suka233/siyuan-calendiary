<template>
    <a-popover>
        <template #title>
            <p class="font-bold w-10rem truncate">
                {{ props.title ? props.title : '暂无标题' }}
            </p>
        </template>
        <template #content>
            <a-tag v-for="tag in props.tags" :key="tag" color="#108ee9"
                >{{ tag }}
            </a-tag>
        </template>
        <template v-for="k in Object.keys($slots)" #[k] :key="k">
            <slot :name="k"></slot>
        </template>
    </a-popover>
</template>

<script lang="ts">
/**
 * @description 日历单元格中的日记卡片的弹出框
 * 原本的设计是，想要只传入当前的日期，然后在此组件内部发请求，来获取消息，但是又想到多一个请求，没啥必要，所以暂时设计为展示的数据都从父组件传入
 * 之后等功能增多了，再考虑是否需要发请求
 * 入参
 * title
 * tags
 */
export default {
    name: 'CardPopover',
};
</script>

<script setup lang="ts">
const props = defineProps<{
    title: string;
    tags: string[];
}>();
</script>

<style scoped></style>
