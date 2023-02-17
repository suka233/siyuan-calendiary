<template>
    <a-popover>
        <template #title>
            <div class="w-15rem text-center truncate font-bold">
                <span :title="props.title ? props.title : '暂无标题'">
                    {{ props.title ? props.title : '暂无标题' }}
                </span>
            </div>
        </template>
        <template #content>
            <div class="w-15rem">
                <!--              图片轮播区域-->
                <!--              标签区域-->
                <div>
                    <div v-if="props.tags.length">
                        <a-tag
                            v-for="(tag, index) in props.tags"
                            :key="index"
                            color="#108ee9"
                            >{{ tag }}
                        </a-tag>
                    </div>
                    <span v-else class="text-gray-400">暂无标签哦...</span>
                </div>
                <!--              更新时间区域-->
                <div class="text-gray-400 mt-2 italic">
                    <span>更新于: {{ updatedDate }}</span>
                </div>
            </div>
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
import dayjs from 'dayjs';
import { ref } from 'vue';

const props = defineProps<{
    title: string;
    tags: string[];
    /**
     * 更新时间时间戳
     */
    updated: string;
}>();
console.log(props.updated);

const updatedDate = ref(dayjs(props.updated).format('YYYY-MM-DD HH:mm:ss'));
</script>

<style scoped></style>
