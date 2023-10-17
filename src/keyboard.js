export function initKeyboard(context){
    if(!context.options.keyboard) return;

    // add event listener when press ESC
    document.addEventListener('keyup', (e) => {
        if(context.isOpen && e.key === 'Escape'){
            context.close();
        }
    });
}