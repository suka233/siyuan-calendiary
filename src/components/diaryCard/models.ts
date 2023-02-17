/**
 * @file 日记卡片组件模型
 * @module app/components/diary-card/model
 * 实例化: 传入id来实例化此条日历
 * 图片 : sql
 * tags : 接口
 * 头图: 接口
 * icon: 接口
 * h1
 * length
 */
import { querySql, getBlockAttrs } from '/@/api/public';

export class Diary {
    title: string;
    /**
     * 头图的css属性
     */
    titleImgCSS: string;
    /**
     * 图片的资源数组
     */
    imgArr: string[];
    tags: string[];
    icon: string;
    titleImgPath: string;

    /**
     * updated
     */
    updated: string;

    private constructor({ blocks, assets, attr }) {
        this.icon = attr.icon;
        this.updated = attr.updated;

        const { tags } = Diary.getTags(blocks);
        this.tags = tags;

        const { title } = Diary.getTitle({ blocks, attr });
        this.title = title;

        const { titleImgCSS, imgArr, titleImgPath } = Diary.getTitleImage({
            attr,
            assets,
        });
        this.titleImgCSS = titleImgCSS;
        this.imgArr = imgArr;
        this.titleImgPath = titleImgPath;
    }

    // async 获取当日的日记列表
    public static async build(id) {
        // 根据id获取block信息
        const { data: blocks } = await querySql(
            this.diaryListSQL(id, 'blocks'),
        ).catch((e) => {
            console.log(`初始化实例失败:${e}`);
        });
        // 根据id获取资源信息
        const { data: assets } = await querySql(
            this.diaryListSQL(id, 'assets'),
        ).catch((e) => {
            console.log(`初始化实例失败:${e}`);
        });

        // 根据id获取属性信息
        const { data: attr } = await getBlockAttrs(id).catch((e) => {
            console.log(`初始化实例失败:${e}`);
        });

        return new Diary({ blocks, assets, attr });
    }

    // 生成查询该文档指定类型的sql语句
    private static diaryListSQL(id, type = 'assets') {
        return `SELECT * FROM ${type} WHERE root_id = '${id}'`;
    }

    // 获取tags
    private static getTags(blocks) {
        let tags: string[] = [];
        blocks.forEach((item) => {
            if (item.tag) {
                // 可能有多个tag, 用空格分隔
                item.tag.split(' ').forEach((tag) => {
                    // 去除首尾的＃
                    // TODO 思源可以自定义标签符号,以后的迭代使用replace方法即可
                    tags.push(tag.slice(1, -1));
                });
            }
        });

        // 去重
        tags = [...new Set(tags)];
        return {
            tags,
        };
    }

    // 获取title
    private static getTitle({ blocks, attr }) {
        let title = '';

        // 获取第一个h1的内容作为title
        blocks.find((item) => {
            if (item.subtype === 'h1') {
                title = item.content;
                return true;
            }
        });

        // 如果没有，就获取第一个块的内容
        if (!title) {
            title = blocks[0]?.content;
        }

        // 如果还是没有，就直接把此文档的标题作为title
        if (!title) {
            title = attr.title;
        }
        return {
            title,
        };
    }

    // 获取头图
    private static getTitleImage({ assets, attr }) {
        let titleImgCSS = attr['title-img'];
        let titleImgPath = '';
        const imgArr: string[] = [];
        // 验证是否为图片格式正则
        const imgReg = /(.*)\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/;

        assets.forEach((item) => {
            // 排除其它的多媒体资源
            if (imgReg.test(item.path)) {
                imgArr.push(item.path);
            }

            // 如果是图片且标题为头图
            if (item.title === '头图' && imgArr.includes(item.path)) {
                titleImgCSS = `background-image: url('http://127.0.0.1:6806/${item.path}');`;
                titleImgPath = item.path;
            }
        });

        // 如果没有头图，就取第一张图片
        if (!titleImgCSS) {
            imgArr[0] &&
                (titleImgCSS = `background-image: url('http://127.0.0.1:6806/${imgArr[0]}');`);
            imgArr[0] && (titleImgPath = imgArr[0]);
        }

        // 还没有的话，就使用默认的颜色
        if (!titleImgCSS) {
            // TODO: 以后可以从配置中读取自定义颜色
            titleImgCSS = 'background-color: #175488;';
            titleImgPath = '';
        }

        return {
            titleImgCSS,
            imgArr,
            titleImgPath,
        };
    }

    // 跳转到指定的diary
    // thanks @fatevase https://github.com/fatevase
    static gotoDiary(id) {
        if (window != window.parent) {
            const main_window = window.parent.document;
            const virtual_link = main_window.createElement('span');
            virtual_link.setAttribute('data-type', 'block-ref');
            virtual_link.setAttribute('data-id', id);
            const temp = main_window.querySelector(
                '.protyle-wysiwyg div[data-node-id] div[contenteditable]',
            );
            temp!.appendChild(virtual_link);
            const click_event = main_window.createEvent('MouseEvents');
            click_event.initMouseEvent(
                'click',
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null,
            );
            virtual_link.dispatchEvent(click_event);
            virtual_link.remove();
        } else {
            const main_window = window.document;
            const virtual_link = main_window.createElement('a');
            virtual_link.setAttribute('href', `siyuan://blocks/${id}`);
            document.body.appendChild(virtual_link);
            const click_event = main_window.createEvent('MouseEvents');
            click_event.initMouseEvent(
                'click',
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null,
            );
            virtual_link.dispatchEvent(click_event);
            virtual_link.remove();
        }
    }
}
