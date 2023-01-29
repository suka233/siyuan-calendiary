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

    const queryDiaryListSQL = `SELECT * FROM blocks WHERE hpath LIKE '%daily note%' AND type = 'd' AND content LIKE '%-__-%'`;
    const refreshDiaryList = async () => {
        querySql(queryDiaryListSQL).then((res: any) => {
            diaryList.value = res?.data;
            diaryNotebookId.value = res?.data[0]?.box;
            diaryHpathHead.value = res?.data[0]?.hpath.split('/')[1];
            diaryList.value.forEach((item) => {
                diaryTitleList.value.push(item.content);
                diaryIdObj[item.content] = item.id;
            });
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
    };
});
