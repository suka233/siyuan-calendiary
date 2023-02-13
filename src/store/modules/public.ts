import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import {
    querySql,
    getNotebookConf,
    listNotebook,
    IListNotebookResponse,
    ISQLAllDiaryResponse,
} from '/@/api/public';
export const usePublicStore = defineStore('app-public', () => {
    // 挂件所在块id
    const blockID = ref<string>('');
    // 挂件默认查询的笔记本id
    const selectedNotebookId = ref<string>('');
    // 笔记本下拉选项
    const notebookOptions = ref<any[]>([]);
    const refreshNotebookOptions = async () => {
        const res: IListNotebookResponse = await listNotebook().catch((e) => {
            console.log(e);
        });
        res.data.notebooks.forEach((item) => {
            notebookOptions.value.push({
                label: item.name,
                value: item.id,
            });
        });
    };

    // 所有的日记数据数组
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const diaryDataArr = ref<typeof ISQLAllDiaryResponse.data>([]);
    // 日记标题数组
    const diaryTitleList = ref<string[]>([]);
    // 日记对应的id对象
    const diaryIdObj = reactive({});
    // 日记所在的notebook id
    const diaryNotebookId = ref<string>('');
    // 日记所在的hpath头部
    const diaryHpathHead = ref<string>('');

    // 日记标题模板
    const diaryNoteSavePath = ref<string>('');
    const syncUserConf = async () => {
        const conf = await getNotebookConf(diaryNotebookId.value).catch((e) => {
            console.log(`同步用户数据失败${e}`);
        });
        diaryNoteSavePath.value = conf?.data?.conf?.dailyNoteSavePath || '';
    };

    // 已经渲染的日记init事件对象，方便按需刷新
    const diaryInitEventObj = reactive({});
    // 将diaryCard的init事件存入对象
    const pushDiaryInitEvent = (diaryDate: string, event: () => void) => {
        diaryInitEventObj[diaryDate] = event;
    };

    // 刷新每个diaryCard的init事件
    const refreshDiaryInitEvent = () => {
        for (const diaryDate in diaryInitEventObj) {
            diaryInitEventObj[diaryDate]();
        }
    };

    // 根据selectedNotebookId计算需要使用的SQL
    const diaryListSQL = computed(() => {
        if (selectedNotebookId.value) {
            // 存在
            return `SELECT * FROM blocks WHERE box = '${selectedNotebookId.value}' AND type = 'd' AND content LIKE '%-__-%'`;
        } else {
            // 不存在
            return `SELECT * FROM blocks WHERE  type = 'd' AND content LIKE '%-__-%'`;
        }
    });

    // 查询指定日记格式的日记
    const refreshDiaryList = async () => {
        const res: ISQLAllDiaryResponse = await querySql(
            diaryListSQL.value,
        ).catch((e) => {
            console.log(`初始化public store错误：${e}`);
        });

        await refreshNotebookOptions().catch((e) =>
            console.log(`刷新笔记本列表失败:${e}`),
        );

        await syncUserConf().catch((e) => console.log(`同步用户配置失败:${e}`));

        diaryDataArr.value = res.data;
        diaryNotebookId.value = res?.data[0]?.box;
        // TODO 准备改为从diaryNoteSavePath中获取
        diaryHpathHead.value = res?.data[0]?.hpath.split('/')[1];
        diaryTitleList.value = [];
        Object.assign(diaryIdObj, {});
        diaryDataArr.value.forEach((item) => {
            // 如果多个日记标题相同，会push多个相同的标题
            diaryTitleList.value.push(item.content);
            // 如果多个日记标题相同，只会显示最后一个
            diaryIdObj[item.content] = item.id;
        });
    };

    // 获取指定笔记本的日记格式

    return {
        diaryListSQL,
        diaryList: diaryDataArr,
        diaryTitleList,
        diaryIdObj,
        diaryNotebookId,
        diaryHpathHead,
        refreshDiaryList,
        pushDiaryInitEvent,
        refreshDiaryInitEvent,
        blockID,
        selectedNotebookId,
    };
});
