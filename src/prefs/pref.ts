import { ComponentPublicInstance } from "vue";

export function add_pref_button(app: ComponentPublicInstance) {
    // 获取最后一个按钮区域
    const gs_hdr_drw_sec = document.querySelector<HTMLDivElement>(".gs_hdr_drw_sec:last-child");
    if (!gs_hdr_drw_sec) {
        return;
    }

    // 创建按钮
    const anchor = document.createElement("a");
    anchor.href = "#";
    anchor.setAttribute("role", "menuitem");
    anchor.classList.add("gs_btnP", "gs_in_ib", "gs_md_li", "gs_md_lix", "gs_in_gray");
    const gs_ico = document.createElement("span");
    gs_ico.classList.add("gs_ico");
    const gs_ia_notf = document.createElement("span");
    gs_ia_notf.classList.add("gs_ia_notf");
    const gs_lbl = document.createElement("span");
    gs_lbl.classList.add("gs_lbl");
    gs_lbl.append(document.createTextNode("标题翻译设置"));
    anchor.appendChild(gs_ico);
    anchor.appendChild(gs_ia_notf);
    anchor.appendChild(gs_lbl);

    // 加入按钮区域
    gs_hdr_drw_sec.appendChild(anchor);

    // 绑定事件
    anchor.addEventListener("click", () => {
        (app as any).toggle();
    });

    return anchor;
}