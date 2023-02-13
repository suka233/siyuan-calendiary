<template>
    <div class="diary-card" @click="clickFn">
        <!--      该日期无日记-->
        <div v-if="!diaryDate" class="no-diary">
            {{ title ? title : props.current.format('DD') }}
        </div>
        <!--      该日期有日记-->
        <div v-else class="has-diary">
            <card-popover :title="title" :tags="tags">
                <div :style="`${titleImgCSS}`">
                    <emoji-icon :icon-unicode="icon"></emoji-icon>
                    <span class="!truncate w-10rem">{{ diaryTitle }}</span>
                </div>
            </card-popover>
        </div>
    </div>
</template>

<script lang="ts">
/**
 * @description 日历单元格中的日记卡片
 * 入参
 * current
 */
export default {
    name: 'DiaryCard',
};
</script>

<script setup lang="ts">
import { Dayjs } from 'dayjs';
import { computed, ref, watch } from 'vue';
import { createDocWithMd } from '/@/api/public';
import CardPopover from './components/cardPopover/index.vue';

import { usePublicStore } from '/@/store/modules/public';
import { storeToRefs } from 'pinia';
import { Diary } from './models';
import EmojiIcon from '/@/components/emojiIcon/index.vue';
const publicStore = usePublicStore();
const { refreshDiaryList, pushDiaryInitEvent } = publicStore;
const { diaryTitleList, diaryIdObj, diaryNotebookId, diaryHpathHead } =
    storeToRefs(publicStore);

const props = defineProps<{
    /**
     * 当前单元格的日期
     */
    current: Dayjs;
}>();

// 计算该条日记的日期
const diaryDate = computed(() => {
    return diaryTitleList.value.includes(props.current.format('YYYY-MM-DD'))
        ? props.current.format('YYYY-MM-DD')
        : '';
});

// 计算该条日记的标题
const diaryTitle = computed(() => {
    if (titleImgPath.value) {
        return title.value ? title.value : props.current.format('DD');
    } else {
        return title.value ? title.value : props.current.format('YYYY-MM-DD');
    }
});

const clickFn = async () => {
    // 有id则打开该日记，无id则新建日记
    if (diaryIdObj.value[diaryDate.value]) {
        Diary.gotoDiary(diaryIdObj.value[diaryDate.value]);
        // 打开该条日记
        // window.open(`siyuan://blocks/${diaryIdObj.value[diaryDate.value]}`);
    } else {
        // 新建日记
        let newDiaryId = '';
        await createDocWithMd(
            diaryNotebookId.value,
            `/${diaryHpathHead.value}/${props.current.format(
                'YYYY',
            )}/${props.current.format('MM')}/${props.current.format(
                'YYYY-MM-DD',
            )}`, // 末尾添加/则会自动创建文件夹
            '',
        ).then((res: any) => {
            console.log(res);
            newDiaryId = res!.data;
        });

        // 刷新列表
        await refreshDiaryList();
        Diary.gotoDiary(newDiaryId);

        // 打开新建的日记
        // window.open(`siyuan://blocks/${newDiaryId}`);
    }
};

const titleImgCSS = ref('');
const title = ref('');
const tags = ref<string[]>([]);
const icon = ref('');
const titleImgPath = ref('');
const init = async () => {
    title.value = '';
    if (diaryIdObj.value[diaryDate.value]) {
        const diary = await Diary.build(diaryIdObj.value[diaryDate.value]);
        tags.value = diary.tags;
        title.value = diary.title;
        titleImgCSS.value = diary.titleImgCSS;
        titleImgPath.value = diary.titleImgPath;
        icon.value = diary.icon;
    }
};

// 监听日记id变化,则可以开始初始化数据了
watch(
    diaryIdObj.value,
    () => {
        init();
        pushDiaryInitEvent(diaryDate.value, init);
    },
    {
        immediate: true,
    },
);
</script>

<style scoped>
.diary-card {
    background-color: rgba(236, 236, 236, 0.4);
    height: 6vw;
    margin: 1px;
    font-size: large;
    font-weight: bold;
    display: block;
}
.diary-card:hover {
    background-color: rgba(236, 236, 236, 1);
}
.no-diary {
    @apply truncate;
    text-align: center;
    line-height: 6vw;
}
.has-diary {
    @apply truncate;
    text-align: center;
    line-height: 6vw;
    color: #e5e5e5;
}
</style>

<style>
.ant-picker-cell {
    margin: 10px !important;
}
</style>
