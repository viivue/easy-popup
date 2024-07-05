import {ATTRS, CLASSES} from "./configs";
import {PopupInstance} from "./types/PopupInstance";

export function initToggleTrigger(context: PopupInstance): void {
    // assign triggers via a[href="#id"], [toggle="id"]
    let triggerSelector = `a[href="#${context.id}"], [${ATTRS.toggle}="${context.id}"]`;

    // custom triggers
    if (context.options.triggerSelector && context.options.triggerSelector.length) {
        triggerSelector += `, ${context.options.triggerSelector}`;
    }

    // look for triggers that link with this popup by id
    assignToggle(context, document.querySelectorAll(triggerSelector));

    // any triggers without id inside this popup will also toggle this popup
    assignToggle(context, context.outer!.querySelectorAll(`[${ATTRS.toggle}]`));
}

function assignToggle(context: PopupInstance, triggers: NodeListOf<Element>): void {
    triggers.forEach(trigger => {
        // avoid duplicate assign
        if (trigger.classList.contains(CLASSES.triggerEnabled)) return;

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
export function wrapElement(innerEl: HTMLElement, outerEl: HTMLDivElement = document.createElement('div')): HTMLDivElement {
    innerEl.parentNode!.insertBefore(outerEl, innerEl);
    outerEl.appendChild(innerEl);
    return outerEl;
}

/**
 * Get scrollbar width
 * https://stackoverflow.com/a/986977/6453822
 * @returns {number}
 */
export function getScrollbarWidth(): number {
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear

    // check if msOverflowStyle is supported
    if ('msOverflowStyle' in outer.style) {
        //@ts-ignore
        outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    }
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode!.removeChild(outer);

    return scrollbarWidth;
}


/**
 * String to slug
 * https://stackoverflow.com/a/1054862/10636614
 * https://www.tunglt.com/2018/11/bo-dau-tieng-viet-javascript-es6/
 * @param string
 * @returns {string}
 */
export function stringToSlug(string = '') {
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
export function uniqueId(prefix = '') {
    return prefix + (+new Date()).toString(16) +
        (Math.random() * 100000000 | 0).toString(16);
}
