import PiaEasyPopup from "./pia-easy-popup";
import {CLASSES, ATTRS, DEFAULTS} from "./configs"
import {EventsManager, getOptionsFromAttribute} from '@phucbm/os-util';
import {uniqueId} from "./utils";
import LenisEasyPopup from "./lenis-easy-popup";
import {generateHTML} from "./html";
import {getScrollbarWidth} from "./utils/getScrollbarWidth";

/**
 * Private class
 */
class Popup{
    constructor(el, options){
        if(!el){
            console.warn('Init popup fail due to empty input!');
            this.id = -1;
            return;
        }

        this.root = document.querySelector(':root');
        this.el = el;
        this.selector = ATTRS.init;
        this.innerHTML = this.el.innerHTML;
        this.isOpen = false;
        this.id = uniqueId('easy-popup-');
        this.idType = 'auto-id';

        // skip double init
        if(this.el.classList.contains(CLASSES.processed)){
            // if(EasyPopupData.dev) console.log('Popup already processed:', this.id);
            this.id = -1;
            return;
        }

        // init events manager
        this.events = new EventsManager(this, {
            names: ['onClose', 'onOpen', 'onInit']
        });

        // get options id from attribute
        this.options = getOptionsFromAttribute(
            {
                target: this.el,
                attributeName: ATTRS.init,
                defaultOptions: {...DEFAULTS, ...options},
                numericValues: ['autoShow', 'showingTimes'],
                onIsString: value => {
                    // value is not a json => use value as ID
                    this.idType = 'attr-id';
                    this.id = value;
                }
            });

        // found id from user options
        if(this.options.id){
            this.id = this.options.id;
            this.idType = this.idType !== 'attr-id' ? 'json-id' : this.idType;
        }

        // in case attr is a number (will be skipped by onIsString)
        const attrId = this.el.getAttribute(ATTRS.init);
        if(attrId !== null && !isNaN(attrId)){
            this.id = `${attrId}`;
            this.idType = 'attr-id';

            // id is a number
            console.warn(`Popup ID should be a string, consider adding a prefix to your ID to avoid unexpected issue, your ID:`, this.id);
        }

        /** DONE GETTING OPTIONS **/

        /** ------ **/

        /** COOKIE **/

        // cookie
        this.cookie = this.options.cookie ? new PiaEasyPopup(this) : null;

        /** HTML **/
        this.masterContainer = document.querySelector(`.${CLASSES.master}`);

        // generate html
        this.outer = undefined;
        generateHTML(this);

        /** AUTO SHOW **/
        // auto show
        if(this.options.autoShow !== false){
            // if Pia exists, check showing status from Pia
            // otherwise, always open popup
            const isShowingPopup = this.cookie ? this.cookie.isShow() : true;

            if(isShowingPopup){
                // default auto show duration is 1000ms
                // or set specifically by a number
                const timeout = this.options.autoShow === true ? 1000 : this.options.autoShow;
                setTimeout(() => this.open(), timeout);
            }
        }

        /** LENIS **/
        // lenis integrate
        this.lenis = new LenisEasyPopup(this);


        /** INIT COMPLETE **/
        if(EasyPopupData.dev) console.log('Popup initialized:', this.id);
        this.events.fire('onInit');
    }

    /******************************
     * EVENTS
     ******************************/
    /**
     * Assign late-events
     */
    on(eventName, callback){
        this.events.add(eventName, callback);
    }


    open(){
        // only open when is close
        if(this.isOpen) return;

        // check active popup
        if(window.EasyPopupData.active){
            EasyPopup.get(window.EasyPopupData.active).close();
        }

        // open
        window.EasyPopupData.active = this.id;
        this.outer.classList.add(CLASSES.open);
        this.isOpen = true;
        this.root.classList.add(CLASSES.rootOpen);
        if(this.options.activeHtmlClass) this.root.classList.add(this.options.activeHtmlClass);

        // prevent scroll > on
        if(this.options.preventScroll){
            if(this.lenis.enabled()){
                // prevent with Lenis
                this.root.classList.add(CLASSES.preventScrollLenis);
                this.lenis.stop();

                if(EasyPopupData.dev) console.log('Disable scroll with Lenis');
            }else{
                // prevent via CSS
                this.root.classList.add(CLASSES.preventScroll);
                this.root.style.setProperty('--ep-scroll-bar-w', `${getScrollbarWidth(this)}px`);

                if(EasyPopupData.dev) console.log('Disable scroll with CSS');
            }
        }


        // let Pia know that the popup was just opened
        this.cookie?.onPopupOpen();

        // event
        if(EasyPopupData.dev) console.log('Popup opened:', this.id);
        this.events.fire('onOpen');
    }

    close(){
        // only close when is open
        if(!this.isOpen) return;

        // close
        window.EasyPopupData.active = '';
        this.outer.classList.remove(CLASSES.open);
        this.isOpen = false;
        this.root.classList.remove(CLASSES.rootOpen);
        if(this.options.activeHtmlClass) this.root.classList.remove(this.options.activeHtmlClass);

        // prevent scroll > off
        setTimeout(() => {
            // set close status when no popup is active
            if(!window.EasyPopupData.active){
                if(this.options.preventScroll){
                    if(this.lenis.enabled()){
                        // prevent with Lenis
                        this.root.classList.remove(CLASSES.preventScrollLenis);
                        this.lenis.start();
                    }else{
                        // prevent via CSS
                        this.root.classList.remove(CLASSES.preventScroll);
                    }

                    if(EasyPopupData.dev) console.log('Enable scroll.');
                }
            }

            // event
            if(EasyPopupData.dev) console.log('Popup closed:', this.id);
            this.events.fire('onClose');
        }, 300);
    }

    toggle(){
        this.isOpen ? this.close() : this.open();
    }
}


/**
 * Private class PopupController
 * This class will hold instances of the library's objects
 */
class PopupController{
    constructor(){
        this.active = '';
        this.popups = [];
        this.nodeEnv = process.env.NODE_ENV; // 'development' or 'production'
        this.dev = this.getDev();
    }

    add(popup){
        if(popup.id !== -1) this.popups.push(popup);
    }

    get(id){
        return this.popups.filter(popup => popup.id === id)[0];
    }

    setDev(isDev){
        // save the dev status to session storage
        sessionStorage.setItem('easy-popup-dev', isDev);

        this.dev = isDev;

        console.info(`EasyPopup: Dev mode is ${isDev ? 'enabled' : 'disabled'} for this session. Please refresh the page to take full effect.`);
    }

    getDev(){
        // if session storage is not available, check dev mode from NODE_ENV
        if(sessionStorage.getItem('easy-popup-dev') === null){
            // by default, true for development, false for production
            return this.nodeEnv === 'development';
        }

        return sessionStorage.getItem('easy-popup-dev') === 'true';
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
    init: (selector = `[${ATTRS.init}]`, options = {}) => {
        document.querySelectorAll(selector).forEach(el => window.EasyPopupData.add(new Popup(el, options)));
    },
    // Get instance object by ID
    get: id => window.EasyPopupData.get(id),

    // Set global default options
    setDev: isDev => window.EasyPopupData.setDev(isDev),
};

// init
window.EasyPopup.init();