import {MatchMediaScreen} from "match-media-screen";
import {ATTRS, CLASSES, CLOSE_SVG, CORNER_POSITIONS, DEFAULTS} from "./configs";

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

    // add theme position class
    if(context.isCornerTheme){
        let inputPosition = context.options.cornerPosition.trim();
        const isExistPosition = CORNER_POSITIONS.includes(inputPosition);

        // add slide effect class
        if(!context.options.cornerFade) context.outer.classList.add(inputPosition.includes("left") ? 'is-slide-lrt' : 'is-slide-rlt');

        // throw warning and set default value if the position is not valid
        if(!isExistPosition){
            console.warn(`"${inputPosition}" is not a valid position for corner theme. Must be one of these: ${CORNER_POSITIONS.join(", ")}. Default position is used: ${DEFAULTS.cornerPosition}.`);
            inputPosition = DEFAULTS.cornerPosition;
        }

        // update position value for instance
        context.options.cornerPosition = inputPosition;

        // add position class
        const positionClass = inputPosition.split(" ").join("-");
        context.outer.classList.add(positionClass);
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