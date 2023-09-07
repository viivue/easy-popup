
/**!
 * Easy Popup v0.2.1
 * @author phucbm
 * @homepage https://github.com/viivue/easy-popup
 * @license MIT 2023
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./src/utils.js
/**
 * String to slug
 * https://stackoverflow.com/a/1054862/10636614
 * https://www.tunglt.com/2018/11/bo-dau-tieng-viet-javascript-es6/
 * @param string
 * @returns {string}
 */
function stringToSlug(string){
    return string
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
}

/**
 * Generate unique ID
 */
function uniqueId(prefix = ''){
    return prefix + (+new Date()).toString(16) +
        (Math.random() * 100000000 | 0).toString(16);
}

;// CONCATENATED MODULE: ./src/pia-easy-popup.js


class PiaEasyPopup{
    constructor(context){
        // check if pia option is using
        const piaValue = context.options.cookie;
        if(!piaValue) return null; // skip if not in use

        // check if Pia is exists
        if(typeof Pia === 'undefined'){
            console.warn(`PiaJs not found.`);
            return null;
        }

        // use popup id as key for Pia
        let cookieName = context.options.cookieName;
        cookieName = typeof cookieName === 'string' && cookieName.length > 0 ? cookieName : context.id;
        this.key = 'easy-popup-' + stringToSlug(cookieName);

        // validate expires
        this.piaOptions = {expires: piaValue};

        // validate times
        const showingTimes = parseInt(context.options.showingTimes) ?? 1;

        // set cookie if is not exists and,
        // if cookie options are using
        if(this.getVal() === null && piaValue){
            // when cookie is still exists, the popup will keep showing for n times
            // by default, popup will show once
            // save directly to Pia to avoid mismatched values
            this.setVal(showingTimes); // todo: allow to set n times
        }
        // otherwise, do nothing
    }

    isShow(){
        // get val from Pia
        const val = this.getVal();

        // true if remaining times is > 0
        return typeof val === 'number' && val > 0;
    }

    // run everytime the popup opens
    onPopupOpen(){
        const val = this.getVal();

        // decrease remaining showing times on open
        if(typeof val === 'number'){
            // update
            this.updateVal(val - 1);
        }
    }

    getVal(){
        return Pia.get(this.key);
    }

    setVal(val){
        // save the new record
        Pia.set(this.key, val, this.piaOptions);
    }

    updateVal(val){
        Pia.update(this.key, val);
    }
}

/* harmony default export */ const pia_easy_popup = (PiaEasyPopup);
;// CONCATENATED MODULE: ./src/configs.js


/**
 * Classes
 * */
const CLASSES = {
    master: 'easy-popup-master',
    processed: 'easy-popup-enabled',
    triggerEnabled: 'easy-popup-trigger-enabled',
    content: 'easy-popup-content',
    outer: 'easy-popup',
    inner: 'easy-popup-inner',
    center: 'easy-popup-center',
    overflow: 'easy-popup-overflow',
    container: 'easy-popup-container',
    open: 'open',
    closeButton: 'easy-popup-close-button',
    hasCustomClose: 'ep-has-custom-close-button',
    mobileHeading: 'ep-mobile-heading',
    hasMobileLayout: 'ep-has-mobile-layout',
    ignoreClick: 'easy-popup-ignore-click',
};
/**
 * Attributes
 * */
const ATTRS = {
    id: 'data-easy-popup-id',
    title: 'data-easy-popup-title',
    toggle: 'data-easy-popup-toggle',
    mobileLayout: 'data-easy-popup-mobile',
    theme: 'data-easy-popup-theme',
    clickOutsideToClose: 'data-easy-popup-click-outside-to-close',
    init: 'data-easy-popup',
};
/**
 * Defaults
 * */
const DEFAULTS = {
    id: uniqueId('easy-popup-'),
    outerClass: '',
    title: '',
    closeButtonHTML: ``,
    triggerSelector: '',
    hasMobileLayout: false, // has mobile layout, false by default
    theme: 'default',

    keyboard: true, // option for closing the popup by keyboard (ESC)

    clickOutsideToClose: true,

    autoShow: false, // boolean or number, e.g. 1000 for 1000ms after init

    cookie: undefined, // use PiaJs `expires`, see https://github.com/phucbm/pia#set-expires
    showingTimes: 1, // show n times before expiration day, only works with cookie
    cookieName: '', // name of the cookie, change name will also lose access to the previous cookie => treat as a new cookie
}
const CLOSE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
;// CONCATENATED MODULE: ./node_modules/@phucbm/os-util/src/events-manager.js
/**
 * Events Manager v0.0.1
 * An util class to manage event with these features:
 * 1. Able to assign event via context.options or context.config
 * 2. Able to assign event via method on()
 * 3. Consistently fire an event with fire() method
 */
class EventsManager{
    constructor(context, options){
        // requires context to access events from context.options or context.config
        if(!context) return;
        this.context = context;

        this.options = {
            names: [],
            ...options
        };


        // list of available event names
        this.eventNames = this.options.names;

        // list of events to be fired
        this.eventsList = [];
    }


    /**
     * Fire an event
     * @param eventName
     * @param obj
     */
    fire(eventName, obj = {}){
        // only when event exists
        if(!this.eventNames.includes(eventName)){
            console.warn(`Cannot fire unrecognized event "${eventName}"`, this, obj);
            return;
        }
        const response = {
            instance: this.context,
            eventName,
            ...obj
        };

        // fire event from option
        const contextOptions = this.context.config ? this.context.config : this.context.options;
        const eventFromOption = contextOptions[eventName];
        if(typeof eventFromOption === 'function') eventFromOption(response);

        // fire event from late-assign list
        const eventFromList = this.eventsList[eventName];
        if(!!eventFromList?.length){
            eventFromList.forEach(callback => {
                if(typeof callback === 'function') callback(response);
            });
        }
    }


    /**
     * Add custom event listener
     */
    add(eventName, callback){
        eventName = getValidatedEventName(eventName);

        // only add registered event names
        const hasEvent = this.eventNames.includes(eventName);
        if(!hasEvent){
            console.warn(`Cannot add unrecognized event "${eventName}"`);
            return;
        }

        // create initial array of events
        if(typeof this.eventsList[eventName] === 'undefined') this.eventsList[eventName] = [];

        // save callback to the array
        this.eventsList[eventName].push(callback);
    }
}


/**
 * Get validated event name
 * make sure event name always has "on" at the beginning
 * @param name
 * @returns {string}
 */
function getValidatedEventName(name){
    let newName = name;

    // input: "onInit" => "onInit"
    // if name starts with "on"
    if(name.slice(0, 2) !== 'on'){
        // not start with "on" => uppercase the first letter and add "on" to the beginning
        newName = newName.charAt(0).toUpperCase() + newName.slice(1);
        newName = "on" + newName;
    }

    //console.log('getValidatedEventName', name, '=>', newName);
    return newName;
}
;// CONCATENATED MODULE: ./node_modules/@phucbm/os-util/src/is-json-string.js
/**
 * Is JSON string
 * https://stackoverflow.com/a/32278428/6453822
 * @param string
 * @returns {any|boolean}
 */
function isJsonString(string){
    try{
        return (JSON.parse(string) && !!string);
    }catch(e){
        return false;
    }
}
;// CONCATENATED MODULE: ./node_modules/@phucbm/os-util/src/get-options-from-attribute.js


/**
 * Get options from attribute v0.0.1
 * @param target
 * @param attributeName
 * @param defaultOptions
 * @param numericValues
 * @param onIsString
 * @param dev
 * @returns {*}
 */
function getOptionsFromAttribute(
    {
        target,
        attributeName = '',
        defaultOptions = {},
        numericValues = [], // convert these props to float
        onIsString = undefined,
        dev = false,
    }
){
    /**
     * Validate
     */
    if(!target){
        if(dev) console.warn('Target not found!', target);
        return defaultOptions;
    }

    // no attribute found
    if(!target.hasAttribute(attributeName)){
        if(dev) console.warn('Attribute not found from target', attributeName);
        return defaultOptions;
    }

    // options from attribute
    const dataAttribute = target.getAttribute(attributeName);

    // no value found
    if(!dataAttribute.length){
        // return default options
        return defaultOptions;
    }

    // not a JSON string
    if(!isJsonString(dataAttribute)){
        if(typeof onIsString === 'function'){
            // exe callback if available
            onIsString(dataAttribute);
        }else{
            // throw warning if callback is not found
            console.warn('Not a JSON string', dataAttribute);
        }
        return defaultOptions;
    }

    /**
     * Parse JSON
     */
        // parse object from string
    let options = JSON.parse(dataAttribute);

    // loop through each prop
    for(const [key, value] of Object.entries(options)){
        // convert boolean string to real boolean
        if(value === "false") options[key] = false;
        else if(value === "true") options[key] = true;

        // convert string to float
        else if(numericValues.includes(key) && typeof value === 'string' && value.length > 0) options[key] = parseFloat(value);
        else options[key] = value;
    }

    return {...defaultOptions, ...options};
}
;// CONCATENATED MODULE: ./src/_index.js




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
        this.options = {...DEFAULTS, id: this.el.id ? this.el.id : DEFAULTS.id};

        // get options id from attribute
        let idFromAttributeString;
        this.options = getOptionsFromAttribute(
            {
                target: this.el,
                attributeName: ATTRS.init,
                defaultOptions: DEFAULTS,
                numericValues: ['autoShow', 'showingTimes'],
                onIsString: dataAttribute => {
                    // data attribute exist => string
                    if(dataAttribute) idFromAttributeString = dataAttribute;
                }
            });

        if(idFromAttributeString){
            this.options.id = idFromAttributeString;
        }

        // get options id from init script
        this.options = {...this.options, ...options};

        // instance get id
        this.id = this.options.id;

        // get string options from attribute and js init
        this.options.title = this.el.getAttribute(ATTRS.title) || this.options.title;
        this.options.theme = this.el.getAttribute(ATTRS.theme) || this.options.theme;

        // get boolean options from attribute and js init
        this.options.clickOutsideToClose = this.isBooleanOptionTrue(ATTRS.clickOutsideToClose, this.options.clickOutsideToClose);
        this.options.hasMobileLayout = this.isBooleanOptionTrue(ATTRS.mobileLayout, this.options.hasMobileLayout);

        // cookie
        this.cookie = this.options.cookie ? new pia_easy_popup(this) : null;

        this.closeButtonHTML = this.options.closeButtonHTML ? this.options.closeButtonHTML : CLOSE_SVG;
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
        if(this.options.closeButtonHTML) this.outer.classList.add(CLASSES.hasCustomClose);
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
/******/ 	return __webpack_exports__;
/******/ })()
;
});