export interface PopupOptions {
    el?: HTMLElement;
    outerClass?: string;
    activeHtmlClass?: string;

    // close button
    closeButtonInnerText?: string;

    // click on this trigger will also toggle the popup
    triggerSelector?: string;

    // mobile layout
    hasMobileLayout?: boolean; // has mobile layout, false by default
    mobileBreakpoint?: number; // switch to mobile layout when the screen size is <=1023px

    // theme
    theme?: string; // right-side

    keyboard?: boolean; // option for closing the popup by keyboard (ESC)

    clickOutsideToClose?: boolean;

    autoShow?: boolean | number; // boolean or number, e.g. 1000 for 1000ms after init

    cookie?: any; // use PiaJs `expires`, see https://github.com/phucbm/pia#set-expires
    showingTimes?: number; // show n times before expiration day, only works with cookie
    cookieName?: string; // name of the cookie, change name will also lose access to the previous cookie => treat as a new cookie

    preventScroll?: boolean; // prevent page scroll when popup is open

    [key: string]: any;
}