import PiaEasyPopup from "./pia-easy-popup";
import {CLASSES, ATTRS, DEFAULTS, CLOSE_SVG} from "./configs"
import {EventsManager, getOptionsFromAttribute} from '@phucbm/os-util';
import {uniqueId} from "./utils";
import LenisEasyPopup from "./lenis-easy-popup";
import {addCloseButton, initMobileLayout, initTheme} from "./layouts";
import {initToggleTrigger} from "./helpers";
import {initKeyboard} from "./keyboard";
import {initOutsideClick} from "./outside-click";

/**
 * Private class
 */
class Popup{
    constructor(el, options){
        if(!el){
            console.warn('Init popup fail due to empty input!');
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
        if(this.el.classList.contains(CLASSES.processed)) return;

        // init events manager
        this.events = new EventsManager(this, {
            names: ['onClose', 'onOpen']
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
            this.idType = this.idType !== 'attribute-id' ? 'json-id' : this.idType;
        }

        // cookie
        this.cookie = this.options.cookie ? new PiaEasyPopup(this) : null;

        this.masterContainer = document.querySelector(`.${CLASSES.master}`);

        this.generateHTML();

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

        // lenis integrate
        this.lenis = new LenisEasyPopup(this);
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

    generateHTML(){
        // check flag
        if(this.el.classList.contains(CLASSES.processed)) return;

        // relocate HTML to body tag
        if(!this.masterContainer){
            this.masterContainer = document.createElement('div');
            this.masterContainer.classList.add(CLASSES.master);
        }
        document.querySelector('body').appendChild(this.masterContainer);
        this.masterContainer.appendChild(this.el);

        // inner
        this.inner = this.wrap(this.el);
        this.inner.classList.add(CLASSES.inner);

        // container
        this.container = this.wrap(this.inner);
        this.container.classList.add(CLASSES.container);

        // overflow
        this.overflow = this.wrap(this.container);
        this.overflow.classList.add(CLASSES.overflow);

        // outer
        this.outer = this.wrap(this.overflow);
        this.outer.classList.add(CLASSES.outer);
        if(this.options.outerClass) this.outer.classList.add(this.options.outerClass);
        this.outer.setAttribute(ATTRS.id, this.id);

        initOutsideClick(this);
        initKeyboard(this);
        initTheme(this);
        initMobileLayout(this); // must call after initTheme()
        addCloseButton(this);
        initToggleTrigger(this); // call at last

        // done init
        this.el.classList.add(CLASSES.processed, CLASSES.content);
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

        // prevent scroll > on
        if(this.options.preventScroll){
            if(this.lenis.enabled()){
                // prevent with Lenis
                this.root.classList.add(CLASSES.preventScrollLenis);
                this.lenis.stop();
            }else{
                // prevent via CSS
                this.root.classList.add(CLASSES.preventScroll);
                this.root.style.setProperty('--ep-scroll-bar-w', `${this.getScrollbarWidth()}px`);
            }
        }

        // let Pia know that the popup was just opened
        this.cookie?.onPopupOpen();

        // event
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
                }
            }

            // event
            this.events.fire('onClose');
        }, 300);
    }

    toggle(){
        this.isOpen ? this.close() : this.open();
    }

    /**
     * Wrap element
     * @param innerEl
     * @param outerEl
     * @returns {HTMLDivElement}
     */
    wrap(innerEl, outerEl = document.createElement('div')){
        innerEl.parentNode.insertBefore(outerEl, innerEl);
        outerEl.appendChild(innerEl);
        return outerEl;
    }

    /**
     * Get scrollbar width
     * https://stackoverflow.com/a/986977/6453822
     * @returns {number}
     */
    getScrollbarWidth(){
        // Creating invisible container
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll'; // forcing scrollbar to appear
        outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
        document.body.appendChild(outer);

        // Creating inner element and placing it in the container
        const inner = document.createElement('div');
        outer.appendChild(inner);

        // Calculating difference between container's full width and the child width
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

        // Removing temporary elements from the DOM
        outer.parentNode.removeChild(outer);

        return scrollbarWidth;
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
    }

    add(popup){
        this.popups.push(popup);
    }

    get(id){
        return this.popups.filter(popup => popup.id === id)[0];
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
    get: id => window.EasyPopupData.get(id)
};

// init
window.EasyPopup.init();