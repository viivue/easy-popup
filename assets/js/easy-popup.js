;(function(EasyPopup){
    /**
     * Private class Popup
     */
    class Popup{
        constructor(el, options){
            if(!el){
                console.warn('Init popup fail due to empty input!');
                return;
            }

            this.root = document.querySelector(':root');
            this.el = el;
            this.selector = 'data-easy-popup';
            this.attributes = {
                id: `${this.selector}-id`,
                title: `${this.selector}-title`,
                toggle: `${this.selector}-toggle`,
            };
            this.classes = {
                processed: 'easy-popup-enabled',
                triggerEnabled: 'easy-popup-trigger-enabled',
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
            this.isOpen = false;

            // options
            this.options = {
                ...{
                    id: this.uniqueId('easy-popup-'),
                    outerClass: '',
                    title: '',
                    closeButtonHTML: `<span>Close</span>`,
                    triggerSelector: ''
                }, ...options
            };
            this.id = this.el.getAttribute(this.selector) || this.options.id;
            this.title = this.el.getAttribute(this.attributes.title) || this.options.title;
            this.closeButtonHTML = this.options.closeButtonHTML;

            this.generateHTML();

            // assign triggers via a[href="#id"], [toggle="id"]
            let triggerSelector = `a[href="#${this.id}"], [${this.attributes.toggle}="${this.id}"]`;
            triggerSelector = this.options.triggerSelector ? `${this.options.triggerSelector}, ${triggerSelector}` : triggerSelector;
            document.querySelectorAll(triggerSelector).forEach(trigger => {
                trigger.classList.add(this.classes.triggerEnabled);
                trigger.addEventListener('click', e => {
                    e.preventDefault();
                    this.toggle();
                });
            });
        }

        generateHTML(){
            // check flag
            if(this.el.classList.contains(this.classes.processed)) return;

            // relocate HTML to body tag
            document.querySelector('body').appendChild(this.el);

            // inner
            this.inner = this.wrap(this.el);
            this.inner.classList.add(this.classes.inner);

            // add inner close button
            this.closeButton = document.createElement('button');
            this.closeButton.classList.add(this.classes.closeButton);
            this.closeButton.innerHTML = this.closeButtonHTML;
            this.closeButton.setAttribute(this.attributes.toggle, '');
            this.closeButton.addEventListener('click', () => this.close());
            this.inner.appendChild(this.closeButton);

            // container
            this.container = this.wrap(this.inner);
            this.container.classList.add(this.classes.container);

            // overflow
            this.overflow = this.wrap(this.container);
            this.overflow.classList.add(this.classes.overflow);

            // overflow > mobile heading
            this.mobileHeading = document.createElement('div');
            this.mobileHeading.classList.add(this.classes.mobileHeading);
            this.mobileHeading.innerHTML = `<div class="easy-popup-heading-inner">
            <div>${this.title}</div>
            <button ${this.attributes.toggle}>${this.closeButtonHTML}</button>
            </div>`;
            this.overflow.appendChild(this.mobileHeading);

            // outer
            this.outer = this.wrap(this.overflow);
            this.outer.classList.add(this.classes.outer);
            if(this.options.outerClass) this.outer.classList.add(this.options.outerClass);
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
            this.root.classList.add('easy-popup-open');

            // prevent scroll > on
            this.root.style.paddingRight = `${this.getScrollbarWidth()}px`;
            this.root.style.overflow = `hidden`;
        }

        close(){
            this.outer.classList.remove(this.classes.open);
            this.isOpen = false;
            this.root.classList.remove('easy-popup-open');

            // prevent scroll > off
            setTimeout(() => {
                this.root.style.paddingRight = ``;
                this.root.style.overflow = ``;
            }, 300);
        }

        toggle(){
            this.isOpen ? this.close() : this.open();
        }

        /**
         * Wrap element
         * @param innerEl
         * @param outerEl
         * @returns {HTMLDivElement}
         */
        wrap(innerEl, outerEl = document.createElement('div')){
            innerEl.parentNode.insertBefore(outerEl, innerEl);
            outerEl.appendChild(innerEl);
            return outerEl;
        }

        /**
         * Get scrollbar width
         * https://stackoverflow.com/a/986977/6453822
         * @returns {number}
         */
        getScrollbarWidth(){
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

        /**
         * Generate unique ID
         */
        uniqueId(prefix = ''){
            return prefix + (+new Date()).toString(16) +
                (Math.random() * 100000000 | 0).toString(16);
        }
    }

    /**
     * Public data
     * access via window.EasyPopupData
     */
    this.EasyPopupData = {
        popups: []
    };

    /**
     * Public methods
     */
    EasyPopup.init = (selector = '[data-easy-popup]', options = {}) => {
        document.querySelectorAll(selector).forEach(el => this.EasyPopupData.popups.push(new Popup(el, options)));
    };
    EasyPopup.init();


    EasyPopup.get = id => this.EasyPopupData.popups.filter(popup => popup.id === id)[0];


})(window.EasyPopup = window.EasyPopup || {});