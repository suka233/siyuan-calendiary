import { 向思源请求数据 } from '/@/utils';

/**
 * api
 * @link https://ld246.com/article/1674009028048
 */
enum Api {
    /**
     * 发送sql请求
     */
    SQL = '/api/query/sql',
    OpenNotebook = '/api/notebook/openNotebook',
    CreateNotebook = '/api/notebook/createNotebook',
    CreateDocWithMd = '/api/filetree/createDocWithMd',
}

/**
 * 发送sql请求
 */
export const querySql = (params: string) => {
    return 向思源请求数据(Api.SQL, {
        stmt: params,
    });
};

/**
 * 打开笔记
 */
export const openNote = (notebook: string) => {
    return 向思源请求数据(Api.OpenNotebook, {
        notebook,
    });
};

/**
 * 创建笔记本
 */
export const createNotebook = (name: string) => {
    return 向思源请求数据(Api.CreateNotebook, {
        name,
    });
};

/**
 * 创建文档
 * {
 *     "notebook":"20210808180117-czj9bvb",
 *     "path":"/daily note/2023/01/2023-01-29",
 *     "markdown":""
 * }
 */
export const createDocWithMd = (
    notebook: string,
    path: string,
    markdown: string,
) => {
    return 向思源请求数据(Api.CreateDocWithMd, {
        notebook,
        path,
        markdown,
    });
};
