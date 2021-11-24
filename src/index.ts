import { insertCSS } from "./utils/css";
import { translate_youdao_next } from "./translators/youdao";

async function main(): Promise<void> {
  insertCSS();
  const list = document.querySelectorAll("h3.gs_rt");
  for (let i = 0; i < list.length; i++) {
    const ele = list.item(i);
    let oriTitle = (ele.textContent ?? "").trim();
    let tagElement = ele.querySelector("span.gs_ctc,span.gs_ctu");
    console.debug(tagElement);
    let tag: string | undefined = undefined;
    let fullTag: string | undefined = undefined;
    if (tagElement) {
      fullTag = tagElement.textContent?.trim();
      tag = tagElement.firstElementChild?.textContent?.trim();
      if (fullTag) oriTitle = oriTitle.replace(fullTag, "").trim();
    }
    const urlEle = ele.querySelector("a");
    let url: string | undefined = undefined;
    if (urlEle) {
      url = urlEle.href;
    }
    try {
      const res = await translate_youdao_next(oriTitle);
      if (!res) return;
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
      console.log("翻译错误");
      console.log(error);
    }

    await sleep(100 + Math.random() * 100);
  }
}

function sleep(duration: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

main();
