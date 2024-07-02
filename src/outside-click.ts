export function initOutsideClick(context: { outer: HTMLElement; options: { clickOutsideToClose: boolean }; close: () => void; inner: HTMLElement }) {
    // detect outside click
    context.outer.addEventListener('click', (e: MouseEvent) => {
        if (isClickOutsideContent(context, e)) {
            // is close
            if (context.options.clickOutsideToClose) {
                context.close();
            }
        }
    });
}

function isClickOutsideContent(context: { inner: HTMLElement }, event: MouseEvent): boolean {
    return !context.inner.contains(event.target as Node);
}
