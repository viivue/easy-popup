import md from "../md/cookie.md";
import mdView from "../md/view-cookie-popup.md";

export function testCookie(root){
    root.insertAdjacentHTML('beforeend', md);

    const isViewingPopup = new URL(window.location.href).search === '?view-cookie-popup';

    if(isViewingPopup){
        root.insertAdjacentHTML('beforeend', mdView);
    }
    const popup = EasyPopup.get('popup-cookie');


    const isClearCookie = new URL(window.location.href).search === '?clear-all-cookie';
    if(isClearCookie){
        console.log('clear cookie')
        Pia.remove(popup.cookie.key) // todo: finish clear cookie
    }


    EasyPopup.init();

    popup.on('open', () => {
        console.log(Pia.test(popup.cookie.key))
    });
}