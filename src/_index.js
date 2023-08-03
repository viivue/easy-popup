import {getOptions} from "./helpers";
import PiaEasyPopup from "./pia-easy-popup";
import {CLASSES, ATTRS, DEFAULTS} from "./configs"


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
        this.selector = 'data-easy-popup';
        this.innerHTML = this.el.innerHTML;
        this.isOpen = false;

        // skip double init
        if(this.el.classList.contains(CLASSES.processed)) return;

        // init events manager
        this.events = new EventsManager(this, {
            names: ['onClose', 'onOpen']
        });

        // options
        this.options = {...DEFAULTS, ...options};


        // get string options from attribute and js init
        this.options.title = this.el.getAttribute(ATTRS.title) || this.options.title;
        this.options.theme = this.el.getAttribute(ATTRS.theme) || this.options.theme;

        // get boolean options from attribute and js init
        this.options.clickOutsideToClose = this.isBooleanOptionTrue(ATTRS.clickOutsideToClose, this.options.clickOutsideToClose);
        this.options.hasMobileLayout = this.isBooleanOptionTrue(ATTRS.mobileLayout, this.options.hasMobileLayout);

        // get options from JSON init
        this.options = getOptions(this, this.options);

        // cookie
        this.cookie = this.options.cookie ? new PiaEasyPopup(this) : null;

        this.closeButtonHTML = this.options.closeButtonHTML;
        this.masterContainer = document.querySelector(`.${CLASSES.master}`);

        this.generateHTML();

        // assign triggers via a[href="#id"], [toggle="id"]
        let triggerSelector = `a[href="#${this.id}"], [${ATTRS.toggle}="${this.id}"]`;
        triggerSelector = this.options.triggerSelector ? `${this.options.triggerSelector}, ${triggerSelector}` : triggerSelector;
        document.querySelectorAll(triggerSelector).forEach(trigger => {
            trigger.classList.add(CLASSES.triggerEnabled);
            trigger.addEventListener('click', e => {
                e.preventDefault();
                this.toggle();
            });
        });

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

    isBooleanOptionTrue(attr, option){
        const attrValue = this.el.getAttribute(attr);
        return attrValue ? attrValue !== 'false' : option;
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

        // add inner close button
        this.closeButton = document.createElement('button');
        this.closeButton.classList.add(CLASSES.closeButton);
        this.closeButton.innerHTML = this.closeButtonHTML;
        this.closeButton.setAttribute(ATTRS.toggle, '');
        this.closeButton.setAttribute('aria-label', `Close popup ${this.options.title}`);
        this.closeButton.addEventListener('click', () => this.close());
        this.inner.appendChild(this.closeButton);

        // container
        this.container = this.wrap(this.inner);
        this.container.classList.add(CLASSES.container);

        // overflow
        this.overflow = this.wrap(this.container);
        this.overflow.classList.add(CLASSES.overflow);

        // overflow > mobile heading
        this.mobileHeading = document.createElement('div');
        this.mobileHeading.classList.add(CLASSES.mobileHeading);
        this.mobileHeading.innerHTML = `<div class="easy-popup-heading-inner">
            <div>${this.options.title}</div>
            <button class="${CLASSES.closeButton} mobile" ${ATTRS.toggle}>${this.closeButtonHTML}</button>
            </div>`;
        this.overflow.appendChild(this.mobileHeading);

        // outer
        this.outer = this.wrap(this.overflow);
        this.outer.classList.add(CLASSES.outer);
        if(this.options.outerClass) this.outer.classList.add(this.options.outerClass);
        if(this.options.hasMobileLayout) this.outer.classList.add(CLASSES.hasMobileLayout);
        this.outer.setAttribute(ATTRS.id, this.id);

        // set theme
        this.outer.setAttribute(ATTRS.theme, this.options.theme);

        // close when click outside of content
        this.outer.addEventListener('click', e => {
            if(e.target.classList.contains(CLASSES.ignoreClick)) return;
            if(this.isClickOutsideContent(e) && this.options.clickOutsideToClose) this.close();
        });

        // close buttons on click
        this.outer.querySelectorAll('[data-easy-popup-toggle]').forEach(btn => {
            btn.addEventListener('click', () => this.close());
        });

        // add event listener when press ESC
        if(this.options.keyboard){
            document.addEventListener('keyup', (e) => {
                if(this.isOpen && e.key === 'Escape'){
                    this.close();
                }
            });
        }

        // done init
        this.el.classList.add(CLASSES.processed, CLASSES.content);
    }

    isClickOutsideContent(event){
        return !this.inner.contains(event.target) && !this.mobileHeading.contains(event.target);
    }

    open(){
        // check active popup
        if(window.EasyPopupData.active){
            EasyPopup.get(window.EasyPopupData.active).close();
        }

        // open
        window.EasyPopupData.active = this.id;
        this.outer.classList.add(CLASSES.open);
        this.isOpen = true;
        this.root.classList.add('easy-popup-open');

        // prevent scroll > on
        this.root.style.paddingRight = `${this.getScrollbarWidth()}px`;
        this.root.style.overflow = `hidden`;

        // let Pia know that the popup was just opened
        this.cookie?.onPopupOpen();

        // event
        this.events.fire('onOpen');
    }

    close(){
        // close
        window.EasyPopupData.active = '';
        this.outer.classList.remove(CLASSES.open);
        this.isOpen = false;
        this.root.classList.remove('easy-popup-open');

        // prevent scroll > off
        setTimeout(() => {
            // set close status when no popup is active
            if(!window.EasyPopupData.active){
                this.root.style.paddingRight = ``;
                this.root.style.overflow = ``;
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
 * access via window.Wellii
 */
window.EasyPopup = {
    // init new instances
    init: (selector = '[data-easy-popup]', options = {}) => {
        document.querySelectorAll(selector).forEach(el => window.EasyPopupData.add(new Popup(el, options)));
    },
    // Get instance object by ID
    get: id => window.EasyPopupData.get(id)
};

// init
window.EasyPopup.init();