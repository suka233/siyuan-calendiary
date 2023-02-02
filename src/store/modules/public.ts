import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { querySql } from '/@/api/public';
export const usePublicStore = defineStore('app-public', () => {
    // 所有的日记列表
    const diaryList = ref<any[]>([]);
    // 日记标题数组
    const diaryTitleList = ref<string[]>([]);
    // 日记对应的id对象
    const diaryIdObj = reactive({});
    // 日记所在的notebook id
    const diaryNotebookId = ref<string>('');
    // 日记所在的hpath头部
    const diaryHpathHead = ref<string>('');

    // 已经渲染的日记init事件对象，方便按需刷新
    const diaryInitEventObj = reactive({});

    // 将diaryCard的init事件存入对象
    const pushDiaryInitEvent = (diaryDate: string, event: Function) => {
        diaryInitEventObj[diaryDate] = event;
    };

    // 刷新每个diaryCard的init事件
    const refreshDiaryInitEvent = () => {
        for (const diaryDate in diaryInitEventObj) {
            diaryInitEventObj[diaryDate]();
        }
    };

    const queryDiaryListSQL = `SELECT * FROM blocks WHERE hpath LIKE '%daily note%' AND type = 'd' AND content LIKE '%-__-%'`;
    const refreshDiaryList = async () => {
        querySql(queryDiaryListSQL)
            .then((res: any) => {
                diaryList.value = res?.data;
                diaryNotebookId.value = res?.data[0]?.box;
                diaryHpathHead.value = res?.data[0]?.hpath.split('/')[1];
                diaryTitleList.value = [];
                Object.assign(diaryIdObj, {});
                diaryList.value.forEach((item) => {
                    diaryTitleList.value.push(item.content);
                    diaryIdObj[item.content] = item.id;
                });
            })
            .catch((e) => {
                console.log(`初始化public store错误：${e}`);
            });
    };

    refreshDiaryList().catch((err) => {
        console.log(err);
    });

    return {
        diaryList,
        diaryTitleList,
        diaryIdObj,
        diaryNotebookId,
        diaryHpathHead,
        refreshDiaryList,
        pushDiaryInitEvent,
        refreshDiaryInitEvent,
    };
});
