// source script
import './pia.module.js';
import '@/_index';
import '@/_style.scss';

// private style
import 'github-markdown-css/github-markdown-light.css'
import {highlightCodeSyntax} from "@phucbm/gfm";
import {testInit} from "./js/test-init";
import {testLayout} from "./js/test-layout";
import {testAutoShow} from "./js/test-auto-show";
import mdOptions from "./md/options.md";
import mdEnd from "./md/end.md";
import mdBegin from "./md/begin.md";

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
root.insertAdjacentHTML('beforeend', mdBegin);

testInit(root);
testLayout(root);
testAutoShow(root);

root.insertAdjacentHTML('beforeend', mdOptions);
root.insertAdjacentHTML('beforeend', mdEnd);

// code highlight
highlightCodeSyntax().then();