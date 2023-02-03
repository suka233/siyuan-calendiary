<template>
    <div class="diary-card" @click="clickFn">
        <!--      该日期无日记-->
        <div v-if="!diaryDate" class="no-diary truncate">
            {{ title ? title : props.current.format('DD') }}
        </div>
        <!--      该日期有日记-->
        <div v-else class="has-diary">
            <card-popover v-if="imgPath" :title="title" :tags="tags">
                <div :style="{ backgroundImage: `url('${imgPath}')` }">
                    {{ title ? title : props.current.format('DD') }}
                </div>
            </card-popover>

            <card-popover v-else :title="title" :tags="tags">
                <div class="truncate">
                    {{ title ? title : props.current.format('YYYY-MM-DD') }}
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
import { querySql, createDocWithMd } from '/@/api/public';
import CardPopover from './components/cardPopover/index.vue';

import { usePublicStore } from '/@/store/modules/public';
import { storeToRefs } from 'pinia';
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

const regex = /\((.+?)\)/g;
const imgPath = ref('');
const title = ref('');
const tags = ref<string[]>([]);
const clickFn = async () => {
    // 有id则打开该日记，无id则新建日记
    if (diaryIdObj.value[diaryDate.value]) {
        // 打开该条日记
        // window.open(`siyuan://blocks/${diaryIdObj.value[diaryDate.value]}`);
        // href.value = `siyuan://blocks/${diaryIdObj.value[diaryDate.value]}`;
        window.location.href = `siyuan://blocks/${
            diaryIdObj.value[diaryDate.value]
        }`;
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

        // 打开新建的日记
        window.open(`siyuan://blocks/${newDiaryId}`);
    }
};
const init = async () => {
    // 清空tags
    tags.value = [];

    if (diaryIdObj.value[diaryDate.value]) {
        const queryDiarySQL = `SELECT * FROM blocks WHERE hpath LIKE '%daily note%' AND root_id = '${
            diaryIdObj.value[diaryDate.value]
        }'`;

        // 发送请求获取该日记的相关内容
        querySql(queryDiarySQL).then((res) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const data = res.data;
            const imgObj = data.find((item) => {
                return item.content.includes('image');
            });

            // 获取tags
            data.forEach((item) => {
                if (item.tag) {
                    // 去除首尾#号
                    tags.value.push(item.tag.slice(1, item.tag.length - 1));
                }
            });
            // tags去重
            tags.value = [...new Set(tags.value)];

            //markdown: "![image](assets/image-20230119173717-akom62w.png)"
            if (imgObj) {
                const matchStr = imgObj.markdown.match(regex)[0];
                // 去除首尾括号
                imgPath.value = `${window.location.origin}/${matchStr.slice(
                    1,
                    matchStr.length - 1,
                )}`;
            }

            // 获取第一个h1作为title
            data.find((item) => {
                if (item.subtype === 'h1') {
                    title.value = item.content;
                    return;
                }
            });
        });
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
    text-align: center;
    line-height: 6vw;
}
.has-diary {
    text-align: center;
    line-height: 6vw;
    background-color: #175488;
    color: #e5e5e5;
}
</style>

<style>
.ant-picker-cell {
    margin: 10px !important;
}
</style>
