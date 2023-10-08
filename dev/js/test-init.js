import md from "../md/init.md";

export function testInit(root){
    root.insertAdjacentHTML('beforeend', md);

    EasyPopup.init();
}