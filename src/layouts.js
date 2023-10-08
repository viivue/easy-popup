import {MatchMediaScreen} from "match-media-screen";
import {ATTRS, CLASSES, CLOSE_SVG} from "./configs";

/**
 * Set up mobile layout
 * @param context
 */
export function initMobileLayout(context){
    if(!context.options.hasMobileLayout) return;

    new MatchMediaScreen({
        object: {
            isMobile: false,
            responsive: [
                {
                    breakpoint: context.options.mobileBreakpoint,
                    settings: {
                        isMobile: true,
                    }
                }
            ],
        },
        debounce: 100, // [ms] debounce time on resize event
        // fire everytime a matched breakpoint is found
        onMatched: data => {
            if(data.object.isMobile){
                context.outer.classList.add('ep-mobile-layout');

                setTheme(context, true);
            }else{
                context.outer.classList.remove('ep-mobile-layout');

                setTheme(context);
            }
        },
    });

    // create html
    // const html = `<div class="ep-mobile-heading">
    //                     <div class="ep-mobile-heading__inner">
    //                         ${context.options.title ? `<div class="ep-mobile-heading__title">${context.options.title}</div>` : ''}
    //                         <button class="${CLASSES.closeButton} for-mobile-layout" ${ATTRS.toggle}>${closeButtonInnerText}</button>
    //                     </div>
    //                 </div>`;

    //context.overflow.insertAdjacentHTML('beforeend', html);

}

export function initTheme(context){
    if(!context.options.theme.length) return;
    if(context.options.theme === 'default') return;

    setTheme(context);
}

/**
 * Set theme via attribute (PRIVATELY USE)
 * @param context
 * @param removeTheme
 */
function setTheme(context, removeTheme = false){
    if(removeTheme){
        context.outer.removeAttribute(ATTRS.theme);
        return;
    }

    // set theme
    context.outer.setAttribute(ATTRS.theme, context.options.theme);
}


export function addCloseButton(context){
    let closeButtonInnerText = CLOSE_SVG;

    // custom close button html
    if(context.options.closeButtonInnerText){
        context.outer.classList.add(CLASSES.hasCustomClose);
        closeButtonInnerText = context.options.closeButtonInnerText;
    }

    let html = `<button class="${CLASSES.closeButton}" ${ATTRS.toggle}>
                    ${closeButtonInnerText}
                </button>`;

    // insert html
    context.inner.insertAdjacentHTML('beforeend', html);
}