/**
 * To prevent page jump when popup is open, we add a padding-right to the body, this is the width of the scrollbar.
 * Scrollbar width is different between browsers and OS, so we need to calculate it.
 * But sometimes, the scrollbar width can be changed by using ::-webkit-scrollbar CSS, so the calculation is not 100% accurate.
 * So we allow the user to set the scrollbar width manually via the `scrollbarWidth` option.
 */
export function getScrollbarWidth(context){
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
function getDetectedScrollbarWidth(){
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