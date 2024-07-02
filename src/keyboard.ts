interface Context {
    options: {
        keyboard: boolean;
    };
    isOpen: boolean;
    close: () => void;
}

export function initKeyboard(context: Context): void {
    if (!context.options.keyboard) return;

    // add event listener when press ESC
    document.addEventListener('keyup', (e: KeyboardEvent) => {
        if (context.isOpen && e.key === 'Escape') {
            context.close();
        }
    });
}
