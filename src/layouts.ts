import {MatchMediaScreen} from "match-media-screen";
import {ATTRS, CLASSES, CLOSE_SVG} from "./configs";
import {PopupInstance} from "./types/PopupInstance";

export function initMobileLayout(context: PopupInstance): void {
    if (!context.options.hasMobileLayout) return;

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
        onMatched: (data: { object: { isMobile: boolean } }) => {
            if (data.object.isMobile) {
                context.outer?.classList.add('ep-mobile-layout');
                setTheme(context, true);
            } else {
                context.outer?.classList.remove('ep-mobile-layout');
                setTheme(context);
            }
        },
    });
}

export function initTheme(context: PopupInstance): void {
    if (!context.options.theme?.length) return;
    if (context.options.theme === 'default') return;

    setTheme(context);
}

/**
 * Set theme via attribute (PRIVATELY USE)
 * @param context
 * @param removeTheme
 */
function setTheme(context: PopupInstance, removeTheme: boolean = false): void {
    if (removeTheme) {
        context.outer?.removeAttribute(ATTRS.theme);
        return;
    }

    // set theme
    context.outer?.setAttribute(ATTRS.theme, context.options.theme || '');
}

export function addCloseButton(context: PopupInstance): void {
    let closeButtonInnerText = CLOSE_SVG;

    // custom close button html
    if (context.options.closeButtonInnerText) {
        context.outer?.classList.add(CLASSES.hasCustomClose);
        closeButtonInnerText = context.options.closeButtonInnerText;
    }

    const getButtonHtml = (classes: string = CLASSES.closeButton, attr: string = ATTRS.toggle) => {
        return `<button class="${classes}" ${attr} aria-label='Close popup'>
                    ${closeButtonInnerText}
                </button>`;
    }

    // insert html
    context.inner?.insertAdjacentHTML('beforeend', getButtonHtml());

    // sticky mobile close button
    context.container?.insertAdjacentHTML('beforebegin', getButtonHtml(`${CLASSES.closeButton} for-mobile-layout`));
}