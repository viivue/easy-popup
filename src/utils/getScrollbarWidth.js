import {isMobile} from "./isMobile";

/**
 * To prevent page jump when popup is open, we add a padding-right to the body, this is the width of the scrollbar.
 * Scrollbar width is different between browsers and OS, so we need to calculate it.
 * But sometimes, the scrollbar width can be changed by using ::-webkit-scrollbar CSS, so the calculation is not 100% accurate.
 * So we allow the user to set the scrollbar width manually via the `scrollbarWidth` option.
 */
export function getScrollbarWidth(context){
    if(isMobile()){
        // console.log('EasyPopup: Mobile or touch device detected, no need to calculate scrollbar width');
        return 0;
    }

    const {scrollbarWidth} = context.options;

    if(scrollbarWidth === undefined){
        return getDetectedScrollbarWidth();
    }

    if(typeof scrollbarWidth === 'number'){
        return scrollbarWidth;
    }

    console.warn('EasyPopup: `scrollbarWidth` must be a number, fallback to auto-detect');
    return getDetectedScrollbarWidth();
}


/**
 * Get scrollbar width
 * Not 100% accurate, but it's the best way to get the scrollbar width
 * https://stackoverflow.com/a/986977/6453822
 * @returns {number}
 */
function getDetectedScrollbarWidth(outerElement = document.body){
    // Use provided element or create a new div
    const outer = outerElement || document.createElement('div');

    // Store original styles
    const originalStyles = {
        visibility: outer.style.visibility,
        overflow: outer.style.overflow,
        msOverflowStyle: outer.style.msOverflowStyle
    };

    // Apply necessary styles
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps

    if(!outerElement){
        document.body.appendChild(outer);
    }

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Cleaning up
    outer.removeChild(inner);

    if(!outerElement){
        outer.parentNode.removeChild(outer);
    }else{
        // Restore original styles
        outer.style.visibility = originalStyles.visibility;
        outer.style.overflow = originalStyles.overflow;
        outer.style.msOverflowStyle = originalStyles.msOverflowStyle;
    }

    return scrollbarWidth;
}
