import md from "../md/layout.md";

export function testLayout(root){
    root.insertAdjacentHTML('beforeend', md);

    EasyPopup.init();
}