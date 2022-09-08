export function insertCSS(): void {

  const style = `
      h3.gs_rt{
        font-size: 14px;
      }
      h3.gtitle_translated{
        font-size: 18px
      }

      .pref-window {
        position: fixed;
        display: none;
        top: 50vh;
        left: 50vw;
        transform: translate(-50%, -50%);
        background-color: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 1rem;
      }

      .pref-window.show {
        display: block;
      }
    `;

  GM.addStyle(style);

}
