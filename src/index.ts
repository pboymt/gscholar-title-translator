import { insertCSS } from "./utils/css";
import { translate_youdao_next } from "./translators/youdao";
import { add_pref_button } from "./prefs/pref";
import { createVueApp } from "./prefs/ui";

const TAG_REGEX = /^(?<tag>\[.+\])\s*/;

async function main(): Promise<void> {

  // const pref = createVueApp();
  
  // add_pref_button(pref);

  insertCSS();

  const list = document.querySelectorAll<HTMLHeadingElement>("h3.gs_rt");

  for (let i = 0; i < list.length; i++) {

    console.debug("main", i, list[i].innerText);

    // 获取元素
    const ele = list.item(i);
    // 获取标题
    const raw_title = (ele.innerText ?? "").trim();
    // 获取标签
    const tag_match = raw_title.match(TAG_REGEX);
    let tag: string | undefined;
    if (tag_match && tag_match.groups && tag_match.groups.tag) {
      tag = tag_match.groups.tag;
    }
    const title = raw_title.replace(TAG_REGEX, "");

    const url_element = ele.querySelector("a");
    let url: string | undefined = undefined;

    if (url_element) {
      url = url_element.href;
    }

    try {

      const res = await translate_youdao_next(title);

      if (!res) continue;
      let transTitle = res;
      if (tag) {
        transTitle = `${tag} ${transTitle}`;
      }

      const nele = document.createElement("h3");

      if (url) {
        const a = document.createElement("a");
        a.href = url;
        a.append(document.createTextNode(transTitle));
        nele.appendChild(a);
      } else {
        nele.appendChild(document.createTextNode(transTitle));
      }

      nele.classList.add("gtitle_translated");
      ele.parentNode?.insertBefore(nele, ele);

    } catch (error) {

      console.debug("翻译错误", error);

    }

    await sleep(100 + Math.random() * 300);

  }
}

function sleep(duration: number) {

  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });

}

window.addEventListener('load', main);
