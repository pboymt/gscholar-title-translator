import { GM_Types } from "../@types/tampermonkey";

export function ajax<T = any>(
    url: string,
    success: (result: string, response?: GM_Types.XHRResponse<T>, obj?: any) => void,
    error: (reason: string) => void,
    { method = 'GET', headers = {}, anonymous = true, ...rest }: GM_Types.XHRDetails<T> = {}) {
    const obj: GM_Types.XHRDetails<T> = Object.assign({
        method,
        headers,
        anonymous
    }, rest);

    GM_xmlhttpRequest<T>({
        method: obj.method,
        url,
        headers: obj.headers,
        anonymous: obj.anonymous,
        responseType: obj.responseType,
        data: obj.data,
        onload(res) {
            success(res.responseText, res, obj);
        },
        onerror(res: any) {
            error(res);
        },
        onabort(res: any) {
            error(res);
        },
        ontimeout() {
            error('the request failed due to a timeout.');
        },
        onreadystatechange(...args) {
            console.log('ajax:', args);
        }
    });
}

export interface ResponseTypeMap<T> {
    json: T;
    text: string;
}

export type ResponseType<T> = keyof ResponseTypeMap<T>;
export type ReturnType<T> = ResponseTypeMap<T>[ResponseType<T>];

export interface RequestOptions<T> {
    method?: 'GET' | 'POST';
    headers?: { [key: string]: string };
    anonymous?: boolean;
    responseType?: ResponseType<T>;
    dataType?: 'json' | 'urlencoded'
    data?: { [key: string]: string };
}
