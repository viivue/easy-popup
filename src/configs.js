const packageInfo = require('../package.json');

/**
 * Classes
 * */
export const CLASSES = {
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
export const ATTRS = {
    id: 'data-easy-popup-id',
    toggle: 'data-ep-toggle',
    theme: 'data-ep-theme',
    init: 'data-easy-popup',
};
/**
 * Defaults
 * */
export const DEFAULTS = {
    version: packageInfo.version,

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
export const CLOSE_SVG = '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';