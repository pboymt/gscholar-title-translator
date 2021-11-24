export function insertCSS(): void {
    const style = `
      h3.gs_rt{
        font-size: 14px;
      }
      h3.gtitle_translated{
        font-size: 18px
      }
    `;
    GM_addStyle(style);
}
