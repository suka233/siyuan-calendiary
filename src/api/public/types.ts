export interface IResParams {
    code: number;
    msg: string;
    data: Array<{
        id: string;
        content: string;
    }>;
}
