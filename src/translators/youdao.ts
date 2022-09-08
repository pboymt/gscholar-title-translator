import axios from "axios";
import adapter from "axios-userscript-adapter";

axios.defaults.adapter = adapter as any;
axios.defaults.timeout = 6000;

interface TranslateResultYouDao {
    fanyi?: {
        tran?: string;
    }
    ec?: {
        word?: {
            trs: {
                tr: {
                    l?: {
                        i?: string[];
                    }
                }[]
            }[]
        }[]
    }
}

function get_translation_in_ec(ec: TranslateResultYouDao["ec"]) {
    if (ec?.word?.length) {
        if (ec.word[0].trs.length) {
            if (ec.word[0].trs[0].tr.length) {
                return ec.word[0].trs[0].tr[0].l?.i?.[0];
            }
        }
    }
}

export async function translate_youdao_next(text: string): Promise<string | undefined> {
    console.debug("translate_youdao_next req", text);
    let url = `https://dict.youdao.com/jsonapi?xmlVersion=5.1&jsonversion=2&q=${encodeURIComponent(text)}`;
    const res = await axios.get<TranslateResultYouDao>(url, {
        headers: {
            'Origin': 'https://dict.youdao.com',
            'Referer': 'https://dict.youdao.com/',
        }

    });
    console.debug("translate_youdao_next res", res.data);
    return res.data.fanyi?.tran ?? get_translation_in_ec(res.data.ec);
}