import { createApp } from 'vue';

export function createVueApp() {
    const pref_element = document.createElement("div");
    pref_element.id = "pref-gtitle";
    document.body.appendChild(pref_element);

    const app = createApp({
        data() {
            return {
                show: false,
            };
        },
        methods: {
            toggle() {
                this.show = !this.show;
            }
        },
        template: /*html*/`
<div class="pref-window" :class="{ show }">
    <h3>标题翻译设置</h3>
</div>
`,
    });

    return app.mount(pref_element);

}