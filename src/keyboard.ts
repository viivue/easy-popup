import {PopupInstance} from "./types/PopupInstance";

export function initKeyboard(context: PopupInstance): void {
    if (!context.options.keyboard) return;

    // add event listener when press ESC
    document.addEventListener('keyup', (e: KeyboardEvent) => {
        if (context.isOpen && e.key === 'Escape') {
            context.close();
        }
    });
}
