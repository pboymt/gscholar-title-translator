import axios from "axios";
import adapter from "axios-userscript-adapter";

axios.defaults.adapter = adapter as any;

interface TranslateResultYouDao {
    fanyi?: {
        tran?: string;
    }
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