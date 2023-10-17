import {ATTRS, CLASSES} from "./configs";

export function initToggleTrigger(context){
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
export function wrapElement(innerEl, outerEl = document.createElement('div')){
    innerEl.parentNode.insertBefore(outerEl, innerEl);
    outerEl.appendChild(innerEl);
    return outerEl;
}


/**
 * Get scrollbar width
 * https://stackoverflow.com/a/986977/6453822
 * @returns {number}
 */
export function getScrollbarWidth(){
    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;
}