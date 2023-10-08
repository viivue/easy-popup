import {ATTRS, CLASSES} from "@/configs";

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