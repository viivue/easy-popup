import {MatchMediaScreen} from "match-media-screen";
import {ATTRS, CLASSES, CLOSE_SVG} from "./configs";

/**
 * Set up mobile layout
 * @param context
 */
export function initMobileLayout(context){
    if(!context.options.hasMobileLayout) return;
    context.outer.classList.add('will-have-mobile-layout');

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

    if(context.options.theme === "corner"){
        const formatPosition = context.options.position.trim().split(" ").join("-");
        context.outer.classList.add(formatPosition);
    }
}


export function addCloseButton(context){
    let closeButtonInnerText = CLOSE_SVG;

    // custom close button html
    if(context.options.closeButtonInnerText){
        context.outer.classList.add(CLASSES.hasCustomClose);
        closeButtonInnerText = context.options.closeButtonInnerText;
    }

    const getButtonHtml = (classes = CLASSES.closeButton, attr = ATTRS.toggle) => {
        return `<button class="${classes}" ${attr} aria-label='Close popup'>
                    ${closeButtonInnerText}
                </button>`;
    }

    // insert html
    context.inner.insertAdjacentHTML('beforeend', getButtonHtml());


    // sticky mobile close button
    if(context.options.hasMobileLayout){
        context.container.insertAdjacentHTML('beforebegin', getButtonHtml(CLASSES.closeButton + ' for-mobile-layout'));
    }
}