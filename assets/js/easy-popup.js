class EasyPopup{
    constructor(){
        this.selector = 'data-easy-popup';
        this.classes = {
            enabled: 'easy-popup-trigger-enabled'
        };
        this.popups = [];
        this.init();
        this.assignTrigger();
    }

    init(){
        const rawPopupContent = document.querySelectorAll(`[${this.selector}]`);
        rawPopupContent.forEach(el => this.popups.push(new Popup(el)));
    }

    get(id){
        return this.popups.filter(popup => popup.id === id)[0];
    }

    assignTrigger(){
        this.popups.forEach(popup => {
            document.querySelectorAll(`a[href="#${popup.id}"]`).forEach(trigger => {
                trigger.classList.add(this.classes.enabled);
                trigger.addEventListener('click', e => {
                    e.preventDefault();
                    popup.toggle();
                });
            });
        });
    }
}

const wrap = (innerEl, outerEl) => {
    outerEl = outerEl || document.createElement('div');
    innerEl.parentNode.insertBefore(outerEl, innerEl);
    outerEl.appendChild(innerEl);
    return outerEl;
}

class Popup{
    constructor(el){
        if(!el){
            console.warn('Init popup fail due to empty input!');
            return;
        }

        this.el = el;
        this.selector = 'data-easy-popup';
        this.attributes = {
            id: `${this.selector}-id`,
            title: `${this.selector}-title`,
            toggle: `${this.selector}-toggle`,
        };
        this.classes = {
            processed: 'easy-popup-enabled',
            content: 'easy-popup-content',
            outer: 'easy-popup',
            inner: 'easy-popup-inner',
            center: 'easy-popup-center',
            overflow: 'easy-popup-overflow',
            container: 'easy-popup-container',
            open: 'open',
            closeButton: 'easy-popup-close-button',
            mobileHeading: 'easy-popup-mobile-heading'
        };
        this.innerHTML = this.el.innerHTML;
        this.id = this.el.getAttribute(this.selector);
        this.isOpen = false;
        this.mobileTitle = () => this.el.getAttribute(this.attributes.title) || '';
        this.closeButtonHTML = `<span>Close</span>`;

        this.init();
    }

    init(){
        // check flag
        if(this.el.classList.contains(this.classes.processed)) return;

        // relocate HTML to body tag
        document.querySelector('body').appendChild(this.el);

        // inner
        this.inner = wrap(this.el);
        this.inner.classList.add(this.classes.inner);

        // add inner close button
        this.closeButton = document.createElement('button');
        this.closeButton.classList.add(this.classes.closeButton);
        this.closeButton.innerHTML = this.closeButtonHTML;
        this.closeButton.setAttribute(this.attributes.toggle, '');
        this.closeButton.addEventListener('click', () => this.close());
        this.inner.appendChild(this.closeButton);

        // container
        this.container = wrap(this.inner);
        this.container.classList.add(this.classes.container);

        // overflow
        this.overflow = wrap(this.container);
        this.overflow.classList.add(this.classes.overflow);

        // overflow > mobile heading
        this.mobileHeading = document.createElement('div');
        this.mobileHeading.classList.add(this.classes.mobileHeading);
        this.mobileHeading.innerHTML = `<div class="easy-popup-heading-inner">
            <div>${this.mobileTitle()}</div>
            <button ${this.attributes.toggle}>${this.closeButtonHTML}</button>
            </div>`;
        this.overflow.appendChild(this.mobileHeading);

        // outer
        this.outer = wrap(this.overflow);
        this.outer.classList.add(this.classes.outer);
        this.outer.setAttribute(this.attributes.id, this.id);

        // close when click outside of content
        this.outer.addEventListener('click', e => {
            if(this.isClickOutsideContent(e)) this.close();
        });

        // close buttons on click
        this.outer.querySelectorAll('[data-easy-popup-toggle]').forEach(btn => {
            btn.addEventListener('click', () => this.close());
        });

        // done init
        this.el.classList.add(this.classes.processed, this.classes.content);
    }

    isClickOutsideContent(event){
        return !this.inner.contains(event.target) && !this.mobileHeading.contains(event.target);
    }

    open(){
        this.outer.classList.add(this.classes.open);
        this.isOpen = true;
    }

    close(){
        this.outer.classList.remove(this.classes.open);
        this.isOpen = false;
    }

    toggle(){
        this.isOpen ? this.close() : this.open();
    }
}