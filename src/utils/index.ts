export async function 向思源请求数据(url: string, data: any) {
    let resData = null;
    await fetch(url, {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            // Authorization: `Token ${config.token}`,
        },
    }).then(function (response) {
        if (response.ok) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            resData = response.json();
            // return resData = response.json()
            // return response.json()
            return;
        }
        const error_msg = `API错误:(${url})${response.status} ${response.statusText}`;
        console.error(error_msg);
    });
    return resData;
}

// 获取挂件所在块信息
export function getWidgetBlockInfo() {
    const id =
        window.frameElement?.parentElement?.parentElement?.dataset.nodeId;
    return {
        id, //挂件块id
    };
}
