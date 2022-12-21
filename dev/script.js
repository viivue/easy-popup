// source script
import '@/_index';
import '@/_style.scss';

// public styles
import '../public/style/fonts.css';

// private style
import './style.scss';

// import package info
const packageInfo = require('../package.json');

/**
 * Update HTML
 */
// update title
const title = `${packageInfo.prettyName} v${packageInfo.version}`;
document.title = `[DEV] ${title} - ${packageInfo.description}`;
document.querySelector('[data-title]').innerHTML = title;

/**
 * Lib usage
 */
EasyPopup.init();

EasyPopup.init('.demo-2', {
    id: 'demo-2',
    title: 'Demo 2',
    triggerSelector: '.open-demo-2',
    closeButtonHTML: '<span>Custom close button HTML</span>',
    outerClass: 'outer-class-test',
    theme: 'style-2'
});

EasyPopup.get('demo-1').open();