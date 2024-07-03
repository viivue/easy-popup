import {ATTRS} from "./configs";
import {PopupOptions} from "./types/PopupOptions";
import {EasyPopup} from "./classes/EasyPopup";
import {PopupController} from "./classes/PopupController";


// Extend the global Window interface to include EasyPopupData
declare global {
    interface Window {
        EasyPopupData: PopupController;
        EasyPopup: {
            init: (selector?: string, options?: PopupOptions) => void;
            get: (id: string) => EasyPopup | undefined;
        };
    }
}

/**
 * Public data
 * access via window.EasyPopupData
 */

window.EasyPopupData = new PopupController();

/**
 * Public library object
 * access via window.EasyPopupData
 */

window.EasyPopup = {
    // init new instances
    init: (selector: string = `[${ATTRS.init}]`, options: PopupOptions = {}) => {

        document.querySelectorAll<HTMLElement>(selector).forEach(el => window.EasyPopupData.add(new EasyPopup(el, options)));
    },
    // Get instance object by ID

    get: (id: string): EasyPopup | undefined => window.EasyPopupData.get(id)
};

// init

window.EasyPopup.init();
