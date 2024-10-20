
/**!
 * Easy Popup v1.2.0
 * @author phucbm
 * @homepage https://easy-popup.netlify.app/
 * @license MIT 2024
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
        this.popupId = context.id;

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

    remove(){
        Pia.remove(this.key);
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
    triggerEnabled: 'ep-trigger-enabled',
    content: 'easy-popup-content',
    outer: 'easy-popup',
    inner: 'easy-popup-inner',
    center: 'easy-popup-center',
    overflow: 'easy-popup-overflow',
    container: 'easy-popup-container',
    open: 'open',
    rootOpen: 'easy-popup-open',
    closeButton: 'ep-close-button',
    hasCustomClose: 'ep-has-custom-close-button',
    preventScroll: 'ep-prevent-scroll',
    preventScrollLenis: 'ep-prevent-scroll-lenis',
};
/**
 * Attributes
 * */
const ATTRS = {
    id: 'data-easy-popup-id',
    toggle: 'data-ep-toggle',
    theme: 'data-ep-theme',
    init: 'data-easy-popup',
};
/**
 * Defaults
 * */
const DEFAULTS = {
    outerClass: '',
    activeHtmlClass: '',

    // close button
    closeButtonInnerText: ``,

    // click on this trigger will also toggle the popup
    triggerSelector: '',

    // mobile layout
    hasMobileLayout: false, // has mobile layout, false by default
    mobileBreakpoint: 768, // switch to mobile layout when the screen size is <=1023px

    // theme
    theme: 'default', // right-side

    keyboard: true, // option for closing the popup by keyboard (ESC)

    clickOutsideToClose: true,

    autoShow: false, // boolean or number, e.g. 1000 for 1000ms after init

    cookie: undefined, // use PiaJs `expires`, see https://github.com/phucbm/pia#set-expires
    showingTimes: 1, // show n times before expiration day, only works with cookie
    cookieName: '', // name of the cookie, change name will also lose access to the previous cookie => treat as a new cookie

    preventScroll: true, // prevent page scroll when popup is open
    scrollbarWidth: undefined, // px, set the scrollbar width manually to avoid page jumping when open a popup, only works for preventScroll:true
}
const CLOSE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
;// CONCATENATED MODULE: ./node_modules/@phucbm/os-util/src/events-manager.js
/**
 * Events Manager v0.0.2
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
        if(contextOptions){
            const eventFromOption = contextOptions[eventName];
            if(typeof eventFromOption === 'function') eventFromOption(response);
        }

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
;// CONCATENATED MODULE: ./src/lenis-easy-popup.js
class LenisEasyPopup{
    constructor(context){
        this.root = context.root;
    }

    enabled(){
        return typeof lenis !== 'undefined' && lenis !== 'undefined';
    }

    stop(){
        if(!this.enabled()) return;

        lenis.stop();
    }

    start(){
        if(!this.enabled()) return;

        lenis.start();
    }
}

/* harmony default export */ const lenis_easy_popup = (LenisEasyPopup);
;// CONCATENATED MODULE: ./src/helpers.js


function initToggleTrigger(context){
    // assign triggers via a[href="#id"], [toggle="id"]
    let triggerSelector = `a[href="#${context.id}"], [${ATTRS.toggle}="${context.id}"]`;

    // custom triggers
    if(context.options.triggerSelector && context.options.triggerSelector.length){
        triggerSelector += `, ${context.options.triggerSelector}`;
    }

    // look for triggers that link with this popup by id
    assignToggle(context, document.querySelectorAll(triggerSelector));

    // any triggers without id inside this popup will also toggle this popup
    assignToggle(context, context.outer.querySelectorAll(`[${ATTRS.toggle}]`));
}

function assignToggle(context, triggers){
    triggers.forEach(trigger => {
        // avoid duplicate assign
        if(trigger.classList.contains(CLASSES.triggerEnabled)) return;

        trigger.addEventListener('click', e => {
            e.preventDefault();
            context.toggle();
        });

        trigger.classList.add(CLASSES.triggerEnabled);
    });
}


/**
 * Wrap element
 * @param innerEl
 * @param outerEl
 * @returns {HTMLDivElement}
 */
function wrapElement(innerEl, outerEl = document.createElement('div')){
    innerEl.parentNode.insertBefore(outerEl, innerEl);
    outerEl.appendChild(innerEl);
    return outerEl;
}
;// CONCATENATED MODULE: ./src/outside-click.js
function initOutsideClick(context){
    // detect outside click
    context.outer.addEventListener('click', e => {
        if(isClickOutsideContent(context, e)){
            // is close
            if(context.options.clickOutsideToClose){
                context.close();
            }
        }
    });
}

function isClickOutsideContent(context, event){
    return !context.inner.contains(event.target);
}

;// CONCATENATED MODULE: ./src/keyboard.js
function initKeyboard(context){
    if(!context.options.keyboard) return;

    // add event listener when press ESC
    document.addEventListener('keyup', (e) => {
        if(context.isOpen && e.key === 'Escape'){
            context.close();
        }
    });
}
;// CONCATENATED MODULE: ./node_modules/match-media-screen/dist/match-media-screen.module.js
/**!
 * Match Media Screen v0.0.3
 * @author phucbm
 * @homepage https://github.com/phucbm/match-media-screen
 * @license MIT 2022
 */var t={d:(e,i)=>{for(var o in i)t.o(i,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:i[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};function i(t,e=!0){const i=[...t];return e?i.sort(((t,e)=>t.breakpoint<e.breakpoint?1:-1)):i.sort(((t,e)=>t.breakpoint>e.breakpoint?1:-1)),i}function o(t,e=150){let i;return(...o)=>{clearTimeout(i),i=setTimeout((()=>{t.apply(this,o)}),e)}}t.d(e,{o:()=>r});class r{constructor(t){if(this.dev=!0===t.dev,this.object=t.object||void 0,this.object){if(this.onMatched=t.onMatched,this.onUpdate=t.onUpdate,window.addEventListener("resize",o((()=>{"function"==typeof this.onUpdate&&this.onUpdate(this.currentObject)}),this.debounce)),!this.object.responsive)return this.currentObject={type:"no-responsive",lastBreakpoint:void 0,breakpoint:-1,object:this.mergeObject(-1,this.object)},"function"==typeof this.onMatched&&this.onMatched(this.currentObject),this.dev&&console.warn("Property object must have responsive array."),!1;this.isInherit=void 0===t.isInherit||t.isInherit,this.debounce=t.debounce||100,this.currentObject={breakpoint:void 0,object:{}},this.object.responsive=i(this.object.responsive),this.match(),window.addEventListener("resize",o((()=>this.match()),this.debounce))}else console.error("Property object:{} must be provided.")}match(){let t=!1;for(let e=0;e<this.object.responsive.length;e++){const i=this.object.responsive[e];if(t=matchMedia(this.getQuery(e)).matches,t){this.currentObject.breakpoint!==i.breakpoint&&(this.currentObject={type:"responsive",lastBreakpoint:this.currentObject.breakpoint,breakpoint:i.breakpoint,object:this.mergeObject(i.breakpoint,i.settings)},"function"==typeof this.onMatched&&this.onMatched(this.currentObject));break}}t||-1===this.currentObject.breakpoint||(this.currentObject={type:"default",lastBreakpoint:this.currentObject.breakpoint,breakpoint:-1,object:this.mergeObject(-1,this.object)},"function"==typeof this.onMatched&&this.onMatched(this.currentObject))}getQuery(t){let e=`screen and (max-width:${this.object.responsive[t].breakpoint}px)`;const i=this.object.responsive[t+1];return i&&(e+=` and (min-width:${i.breakpoint+1}px)`),e}mergeObject(t,e){let o={...e};if(this.isInherit&&-1!==t){const e=i(this.object.responsive,!1);for(let i=0;i<e.length;i++)e[i].breakpoint>t&&(o={...e[i].settings,...o})}return o={...this.object,...o},delete o.responsive,o}}var n=e.o;
;// CONCATENATED MODULE: ./src/layouts.js



/**
 * Set up mobile layout
 * @param context
 */
function initMobileLayout(context){
    if(!context.options.hasMobileLayout) return;
    context.outer.classList.add('will-have-mobile-layout');

    new n({
        object: {
            isMobile: false,
            responsive: [
                {
                    breakpoint: context.options.mobileBreakpoint,
                    settings: {
                        isMobile: true,
                    }
                }
            ],
        },
        debounce: 100, // [ms] debounce time on resize event
        // fire everytime a matched breakpoint is found
        onMatched: data => {
            if(data.object.isMobile){
                context.outer.classList.add('ep-mobile-layout');

                setTheme(context, true);
            }else{
                context.outer.classList.remove('ep-mobile-layout');

                setTheme(context);
            }
        },
    });
}

function initTheme(context){
    if(!context.options.theme.length) return;
    if(context.options.theme === 'default') return;

    setTheme(context);
}

/**
 * Set theme via attribute (PRIVATELY USE)
 * @param context
 * @param removeTheme
 */
function setTheme(context, removeTheme = false){
    if(removeTheme){
        context.outer.removeAttribute(ATTRS.theme);
        return;
    }

    // set theme
    context.outer.setAttribute(ATTRS.theme, context.options.theme);
}


function addCloseButton(context){
    let closeButtonInnerText = CLOSE_SVG;

    // custom close button html
    if(context.options.closeButtonInnerText){
        context.outer.classList.add(CLASSES.hasCustomClose);
        closeButtonInnerText = context.options.closeButtonInnerText;
    }

    const getButtonHtml = (classes = CLASSES.closeButton, attr = ATTRS.toggle) => {
        return `<button class="${classes}" ${attr} aria-label='Close popup'>
                    ${closeButtonInnerText}
                </button>`;
    }

    // insert html
    context.inner.insertAdjacentHTML('beforeend', getButtonHtml());


    // sticky mobile close button
    if(context.options.hasMobileLayout){
        context.container.insertAdjacentHTML('beforebegin', getButtonHtml(CLASSES.closeButton + ' for-mobile-layout'));
    }
}
;// CONCATENATED MODULE: ./src/html.js






function generateHTML(context){
    // check flag
    if(context.el.classList.contains(CLASSES.processed)) return;

    // relocate HTML to body tag
    if(!context.masterContainer){
        context.masterContainer = document.createElement('div');
        context.masterContainer.classList.add(CLASSES.master);
    }
    document.querySelector('body').appendChild(context.masterContainer);
    context.masterContainer.appendChild(context.el);

    // inner
    context.inner = wrapElement(context.el);
    context.inner.classList.add(CLASSES.inner);

    // container
    context.container = wrapElement(context.inner);
    context.container.classList.add(CLASSES.container);

    // overflow
    context.overflow = wrapElement(context.container);
    context.overflow.classList.add(CLASSES.overflow);

    // outer
    context.outer = wrapElement(context.overflow);
    context.outer.classList.add(CLASSES.outer);
    if(context.options.outerClass){
        const classes = context.options.outerClass.trim().split(' ');
        for(let i = 0; i < classes.length; i++) context.outer.classList.add(classes[i])
    }
    context.outer.setAttribute(ATTRS.id, context.id);

    initOutsideClick(context);
    initKeyboard(context);
    initTheme(context);
    initMobileLayout(context); // must call after initTheme()
    addCloseButton(context);
    initToggleTrigger(context); // call at last

    // done init
    context.el.classList.add(CLASSES.processed, CLASSES.content);
}
;// CONCATENATED MODULE: ./src/utils/isMobile.js
// https://stackoverflow.com/a/11381730/6453822
function isMobile(){
    let check = false;
    (function(a){
        if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
}
;// CONCATENATED MODULE: ./src/utils/getScrollbarWidth.js


/**
 * To prevent page jump when popup is open, we add a padding-right to the body, this is the width of the scrollbar.
 * Scrollbar width is different between browsers and OS, so we need to calculate it.
 * But sometimes, the scrollbar width can be changed by using ::-webkit-scrollbar CSS, so the calculation is not 100% accurate.
 * So we allow the user to set the scrollbar width manually via the `scrollbarWidth` option.
 */
function getScrollbarWidth(context){
    if(isMobile()){
        // console.log('EasyPopup: Mobile or touch device detected, no need to calculate scrollbar width');
        return 0;
    }

    const {scrollbarWidth} = context.options;

    if(scrollbarWidth === undefined){
        return getDetectedScrollbarWidth();
    }

    if(typeof scrollbarWidth === 'number'){
        return scrollbarWidth;
    }

    console.warn('EasyPopup: `scrollbarWidth` must be a number, fallback to auto-detect');
    return getDetectedScrollbarWidth();
}


/**
 * Get scrollbar width
 * Not 100% accurate, but it's the best way to get the scrollbar width
 * https://stackoverflow.com/a/986977/6453822
 * @returns {number}
 */
function getDetectedScrollbarWidth(outerElement = document.body){
    // Use provided element or create a new div
    const outer = outerElement || document.createElement('div');

    // Store original styles
    const originalStyles = {
        visibility: outer.style.visibility,
        overflow: outer.style.overflow,
        msOverflowStyle: outer.style.msOverflowStyle
    };

    // Apply necessary styles
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    if(!outerElement){
        document.body.appendChild(outer);
    }

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Cleaning up
    outer.removeChild(inner);

    if(!outerElement){
        outer.parentNode.removeChild(outer);
    }else{
        // Restore original styles
        outer.style.visibility = originalStyles.visibility;
        outer.style.overflow = originalStyles.overflow;
        outer.style.msOverflowStyle = originalStyles.msOverflowStyle;
    }

    return scrollbarWidth;
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

        // cookie
        this.cookie = this.options.cookie ? new pia_easy_popup(this) : null;

        this.masterContainer = document.querySelector(`.${CLASSES.master}`);

        // generate html
        this.outer = undefined;
        generateHTML(this);

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
        this.lenis = new lenis_easy_popup(this);
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
            }else{
                // prevent via CSS
                this.root.classList.add(CLASSES.preventScroll);
                this.root.style.setProperty('--ep-scroll-bar-w', `${getScrollbarWidth(this)}px`);
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
                }
            }

            // event
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