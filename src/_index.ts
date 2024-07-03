import PiaEasyPopup from "./pia-easy-popup";
import {CLASSES, ATTRS, DEFAULTS} from "./configs";
import {getOptionsFromAttribute} from '@phucbm/get-options-from-html-attr';
import {EventsManager} from "@phucbm/events-manager";
import LenisEasyPopup from "./lenis-easy-popup";
import {getScrollbarWidth, uniqueId} from "./helpers";
import {generateHTML} from "./html";
import {PopupOptions} from "./types/PopupOptions";
import {PopupInstance} from "./types/PopupInstance";
import {PopupControllerInterface} from "./types/PopupControllerInterface";

/**
 * Private class
 */
class EasyPopup implements PopupInstance {
    root: HTMLElement;
    el: HTMLElement;
    selector: string;
    innerHTML: string;
    isOpen: boolean;
    id: string;
    idType: string;
    options: PopupOptions;
    events: EventsManager;
    cookie: PiaEasyPopup | null;
    masterContainer: HTMLElement | null;
    outer: HTMLElement | undefined;
    inner: HTMLElement | undefined;
    lenis: LenisEasyPopup;
    container: HTMLElement | undefined;
    overflow: HTMLElement | undefined;


    constructor(el: HTMLElement, options: PopupOptions) {
        if (!el) {
            console.warn('Init popup fail due to empty input!');
            return;
        }

        this.root = document.querySelector(':root') as HTMLElement;
        this.el = el;
        this.selector = ATTRS.init;
        this.innerHTML = this.el.innerHTML;
        this.isOpen = false;
        this.id = uniqueId('easy-popup-');
        this.idType = 'auto-id';

        // skip double init
        if (this.el.classList.contains(CLASSES.processed)) return;

        // init events manager
        this.events = new EventsManager(this, {
            names: ['onClose', 'onOpen']
        });

        // get options id from attribute
        this.options = getOptionsFromAttribute({
            target: this.el,
            attributeName: ATTRS.init,
            defaultOptions: {...DEFAULTS, ...options},
            numericValues: ['autoShow', 'showingTimes'],
            onIsString: value => {
                // value is not a json => use value as ID
                this.idType = 'attr-id';
                this.id = value;
            }
        }) as PopupOptions;

        // found id from user options
        if (this.options.id) {
            this.id = this.options.id;
            this.idType = this.idType !== 'attr-id' ? 'json-id' : this.idType;
        }

        // in case attr is a number (will be skipped by onIsString)
        const attrId = this.el.getAttribute(ATTRS.init) || '';
        // check if attr is a number
        if (attrId !== '' && !isNaN(Number(attrId))) {
            this.id = `${attrId}`;
            this.idType = 'attr-id';

            // id is a number
            console.warn(`Popup ID should be a string, consider adding a prefix to your ID to avoid unexpected issue, your ID:`, this.id);
        }

        // cookie
        this.cookie = this.options.cookie ? new PiaEasyPopup(this) : null;

        this.masterContainer = document.querySelector(`.${CLASSES.master}`);

        // generate html
        this.outer = undefined;
        generateHTML(this);

        // auto show
        if (this.options.autoShow !== false) {
            // if Pia exists, check showing status from Pia
            // otherwise, always open popup
            const isShowingPopup = this.cookie ? this.cookie.isShow() : true;

            if (isShowingPopup) {
                // default auto show duration is 1000ms
                // or set specifically by a number
                const timeout = this.options.autoShow === true ? 1000 : this.options.autoShow;
                setTimeout(() => this.open(), timeout);
            }
        }

        // lenis integrate
        this.lenis = new LenisEasyPopup(this);
    }

    /******************************
     * EVENTS
     ******************************/
    /**
     * Assign late-events
     */
    on(eventName: string, callback: () => void): void {
        this.events.add(eventName, callback);
    }

    open(): void {
        // only open when is close
        if (this.isOpen) return;

        // check active popup

        if (window.EasyPopupData.active) {

            window.EasyPopupData.get(window.EasyPopupData.active)?.close();
        }

        // open

        window.EasyPopupData.active = this.id;
        this.outer!.classList.add(CLASSES.open);
        this.isOpen = true;
        this.root.classList.add(CLASSES.rootOpen);
        if (this.options.activeHtmlClass) this.root.classList.add(this.options.activeHtmlClass);

        // prevent scroll > on
        if (this.options.preventScroll) {
            if (this.lenis.enabled()) {
                // prevent with Lenis
                this.root.classList.add(CLASSES.preventScrollLenis);
                this.lenis.stop();
            } else {
                // prevent via CSS
                this.root.classList.add(CLASSES.preventScroll);
                this.root.style.setProperty('--ep-scroll-bar-w', `${getScrollbarWidth()}px`);
            }
        }

        // let Pia know that the popup was just opened
        this.cookie?.onPopupOpen();

        // event
        this.events.fire('onOpen');
    }

    close(): void {
        // only close when is open
        if (!this.isOpen) return;

        // close

        window.EasyPopupData.active = '';
        this.outer!.classList.remove(CLASSES.open);
        this.isOpen = false;
        this.root.classList.remove(CLASSES.rootOpen);
        if (this.options.activeHtmlClass) this.root.classList.remove(this.options.activeHtmlClass);

        // prevent scroll > off
        setTimeout(() => {
            // set close status when no popup is active

            if (!window.EasyPopupData.active) {
                if (this.options.preventScroll) {
                    if (this.lenis.enabled()) {
                        // prevent with Lenis
                        this.root.classList.remove(CLASSES.preventScrollLenis);
                        this.lenis.start();
                    } else {
                        // prevent via CSS
                        this.root.classList.remove(CLASSES.preventScroll);
                    }
                }
            }

            // event
            this.events.fire('onClose');
        }, 300);
    }

    toggle(): void {
        this.isOpen ? this.close() : this.open();
    }
}

/**
 * Private class PopupController
 * This class will hold instances of the library's objects
 */
class PopupController implements PopupControllerInterface {
    active: string;
    popups: EasyPopup[];

    constructor() {
        this.active = '';
        this.popups = [];
    }

    add(popup: EasyPopup): void {
        this.popups.push(popup);
    }

    get(id: string): EasyPopup | undefined {
        return this.popups.find(popup => popup.id === id);
    }
}

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
