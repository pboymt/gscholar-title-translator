import { ajax } from "../utils/ajax";
import axios from "axios";
import adapter from "axios-userscript-adapter";

axios.defaults.adapter = adapter as any;

interface TranslateResultYouDao {
    fanyi?: {
        tran?: string;
    }
}

export function translate_youdao(text: string): Promise<string | undefined> {
    let url = `https://dict.youdao.com/jsonapi?xmlVersion=5.1&jsonversion=2&q=${encodeURIComponent(text)}`;
    return new Promise((resolve, reject) => {
        ajax(url, (rst) => {
            resolve(JSON.parse(rst)?.fanyi?.tran);
        }, (err) => {
            reject(err);
        });
    });
}


export async function translate_youdao_next(text: string): Promise<string | undefined> {
    let url = `https://dict.youdao.com/jsonapi?xmlVersion=5.1&jsonversion=2&q=${encodeURIComponent(text)}`;
    const res = await axios.get<TranslateResultYouDao>(url, {
        headers: {
            'Origin': 'https://dict.youdao.com',
            'Referer': 'https://dict.youdao.com/',
        }

    });
    return res.data.fanyi?.tran;
}