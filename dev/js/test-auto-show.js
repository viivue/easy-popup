import md from "../md/auto-show.md";
import mdView from "../md/view-auto-show.md";

export function testAutoShow(root){
    root.insertAdjacentHTML('beforeend', md);

    const isViewingAutoShowPopup = new URL(window.location.href).search === '?view-auto-show-popup';

    if(isViewingAutoShowPopup){
        root.insertAdjacentHTML('beforeend', mdView);
    }

    EasyPopup.init();
}