// source script
import './pia.module.js';
import '@/_index';
import '@/_style.scss';

// private style
import 'github-markdown-css/github-markdown-light.css'
import {CLOSE_SVG} from "@/configs";
import {testInit} from "./js/test-init";
import {highlightCodeSyntax} from "@phucbm/gfm";

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

// add HTML
const root = document.querySelector('#content');
testInit(root);

// code highlight
highlightCodeSyntax().then();

/**
 * Lib usage
 */
EasyPopup.init('.demo-2', {
    id: 'demo-2',
    title: 'Demo 2',
    triggerSelector: '.open-demo-2',
    closeButtonHTML: `${CLOSE_SVG}<span>Close</span>`,
    outerClass: 'outer-class-test',
    theme: 'style-2'
});