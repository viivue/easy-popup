export function initOutsideClick(context){
    // detect outside click
    context.outer.addEventListener('click', e => {
        if(isClickOutsideContent(context, e)){
            // is close
            if(context.options.clickOutsideToClose){
                context.close();
            }
        }
    });
}

function isClickOutsideContent(context, event){
    return !context.inner.contains(event.target);
}
