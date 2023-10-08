import {ATTRS, CLASSES} from "@/configs";

export function initTriggers(context){
    // assign triggers via a[href="#id"], [toggle="id"]
    let triggerSelector = `a[href="#${context.id}"], [${ATTRS.toggle}="${context.id}"]`;

    // custom triggers
    if(context.options.triggerSelector && context.options.triggerSelector.length){
        triggerSelector += `, ${context.options.triggerSelector}`;
    }

    document.querySelectorAll(triggerSelector).forEach(trigger => {
        // avoid duplicate assign
        if(trigger.classList.contains(CLASSES.triggerEnabled)) return;

        trigger.addEventListener('click', e => {
            e.preventDefault();
            context.toggle();
        });

        trigger.classList.add(CLASSES.triggerEnabled);
    });
}