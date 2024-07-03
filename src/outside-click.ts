import {Popup} from "./types";

export function initOutsideClick(context: Popup) {
    // detect outside click
    if ("addEventListener" in context.outer) {
        context.outer?.addEventListener('click', (e: MouseEvent) => {
            if (isClickOutsideContent(context, e)) {
                // is close
                if (context.options.clickOutsideToClose) {
                    context.close();
                }
            }
        });
    }
}

function isClickOutsideContent(context: Popup, event: MouseEvent): boolean {
    // check if HTMLElement contains HTMLElement
    return !context.inner?.contains(event.target as Node);
}