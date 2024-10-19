export class DragDetector{
    constructor(element, options = {}){
        this.element = element;
        this.options = {
            threshold: 50,
            onDrag: () => {
            },
            onDragEnd: () => {
            },
            ...options
        };
        this.startY = 0;
        this.startX = 0;
        this.currentY = 0;
        this.currentX = 0;

        this.onTouchStart = this.onTouchStart.bind(this);
        this.onTouchMove = this.onTouchMove.bind(this);
        this.onTouchEnd = this.onTouchEnd.bind(this);

        this.element.addEventListener('touchstart', this.onTouchStart);
        this.element.addEventListener('touchmove', this.onTouchMove);
        this.element.addEventListener('touchend', this.onTouchEnd);
    }

    onTouchStart(event){
        this.startY = this.currentY = event.touches[0].clientY;
        this.startX = this.currentX = event.touches[0].clientX;
    }

    onTouchMove(event){
        this.currentY = event.touches[0].clientY;
        this.currentX = event.touches[0].clientX;

        const deltaY = this.currentY - this.startY;
        const deltaX = this.currentX - this.startX;

        this.options.onDrag({
            deltaY,
            deltaX,
            direction: this.getDirection(deltaX, deltaY)
        });
    }

    onTouchEnd(event){
        const endY = event.changedTouches[0].clientY;
        const endX = event.changedTouches[0].clientX;

        const deltaY = endY - this.startY;
        const deltaX = endX - this.startX;

        const direction = this.getDirection(deltaX, deltaY);

        if(Math.abs(deltaY) > this.options.threshold || Math.abs(deltaX) > this.options.threshold){
            this.options.onDragEnd({
                deltaY,
                deltaX,
                direction
            });
        }
    }

    getDirection(deltaX, deltaY){
        if(Math.abs(deltaY) > Math.abs(deltaX)){
            return deltaY > 0 ? 'down' : 'up';
        }else{
            return deltaX > 0 ? 'right' : 'left';
        }
    }

    destroy(){
        this.element.removeEventListener('touchstart', this.onTouchStart);
        this.element.removeEventListener('touchmove', this.onTouchMove);
        this.element.removeEventListener('touchend', this.onTouchEnd);
    }
}