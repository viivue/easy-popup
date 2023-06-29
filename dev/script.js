// source script
//import "piajs";
import './pia.module.js';
import '@/_index';
import '@/_style.scss';
import 'honcau';

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
document.title = `${title} - ${packageInfo.description}`;
document.querySelector('[data-title]').innerHTML = title;
document.querySelector('[data-description]').innerHTML = packageInfo.description;

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