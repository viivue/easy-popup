// Usage example
import {DragDetector} from "./DragDetector";

export function dragToClose(context){
    const element = context.inner;
    const dragDetector = new DragDetector(element, {
        threshold: 50,
        onDrag: ({deltaY, deltaX, direction}) => {
            if(direction === 'down'){
                console.log('Dragging down', deltaY);
                // Apply transition based on drag distance
                element.style.transform = `translateY(${deltaY}px)`;
                element.style.opacity = `${1 - Math.min(Math.abs(deltaY) / 200, 1)}`;
            }
        },
        onDragEnd: ({deltaY, deltaX, direction}) => {
            if(direction === 'down' && deltaY > 50){
                console.log('close', deltaY);
                // Close the popup
                context.close();
            }else{
                console.log('reset', deltaY);
                // Reset the popup position
                element.style.transform = 'translateY(0)';
                element.style.opacity = '1';
            }
        }
    });

    context.on('close', () => {
        element.style.transform = 'translateY(0)';
        element.style.opacity = '1';
    });
}

// To remove listeners when no longer needed
// dragDetector.destroy();