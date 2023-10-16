import md from "../md/init.md";

export function testInit(root){
    root.insertAdjacentHTML('beforeend', md);

    EasyPopup.init();

    EasyPopup.init('.your-class', {
        id: 'popup-js',
        // more options here
    });
}