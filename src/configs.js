import {uniqueId} from './utils'

/**
 * Defaults
 * */
export const DEFAULTS = {
  id: uniqueId('easy-popup-'),
  outerClass: '',
  title: '',
  closeButtonHTML: `<span><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg></span>`,
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