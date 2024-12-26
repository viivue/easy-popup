import {ATTRS, CLASSES} from "./configs";
import {initToggleTrigger, wrapElement} from "./helpers";
import {initOutsideClick} from "./outside-click";
import {initKeyboard} from "./keyboard";
import {addCloseButton, initMobileLayout, initTheme} from "./layouts";

export function generateHTML(context){
    const isCornerTheme = context.options.theme === 'corner';

    // check flag
    if(context.el.classList.contains(CLASSES.processed)) return;

    // relocate HTML to body tag
    if(!context.masterContainer){
        context.masterContainer = document.createElement('div');
        context.masterContainer.classList.add(CLASSES.master);
    }

    if(!isCornerTheme){
        document.querySelector('body').appendChild(context.masterContainer);
        context.masterContainer.appendChild(context.el);
    }

    // inner
    context.inner = wrapElement(context.el);
    context.inner.classList.add(CLASSES.inner);

    if(isCornerTheme){
        document.querySelector('body').appendChild(context.inner);
    }

    // container
    context.container = wrapElement(context.inner);
    context.container.classList.add(CLASSES.container);

    // overflow
    context.overflow = wrapElement(context.container);
    context.overflow.classList.add(CLASSES.overflow);

    // outer
    context.outer = wrapElement(context.overflow);
    context.outer.classList.add(CLASSES.outer);

    // theme: corner
    if(isCornerTheme){
        context.outer.classList.add(CLASSES.master + '-corner');
    }

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