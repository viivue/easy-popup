import md from "../md/cookie.md";
import mdView from "../md/view-cookie-popup.md";

export function testCookie(root){
    root.insertAdjacentHTML('beforeend', md);

    // is load popup demo HTML
    const isViewingPopup = new URL(window.location.href).search === '?view-cookie-popup';
    if(isViewingPopup){
        root.insertAdjacentHTML('beforeend', mdView);
    }

    // init
    EasyPopup.init();
    const popup = EasyPopup.get('popup-cookie');

    // clear all cookie
    const btnClearCookie = document.querySelector('[href="#data-clear-cookie"]');
    if(popup && btnClearCookie){
        btnClearCookie.addEventListener('click', (e) => {
            e.preventDefault();
            popup.cookie.remove();
            window.location.href = '?view-cookie-popup';
        })
    }


    // update test data on popup open
    popup?.on('open', () => {
        const test = Pia.test(popup.cookie.key);
        if(!test || !test.record || !test.leftover){
            const textCookieOff = popup.el.querySelector('[data-pia-test="for-cookie-off"]');
            textCookieOff.style.display = ''; // show
            return;
        }

        const textCookieOn = popup.el.querySelector('[data-pia-test="for-cookie-on"]');
        textCookieOn.innerHTML = `<ul>
                        <li>Times left: ${test.record.value}
                        ${test.record.value === 0 ? ' - <b>This popup will not open on the next page reload.</b>' : ''}
                        </li>
                        <li>${test.leftover[2]}</li>
                    </ul>`;
    });
}