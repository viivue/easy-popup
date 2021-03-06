# Easy Popup v0.0.3

Super light-weight JavaScript library to create a simple popup with mobile layout.

## Init

Setup HTML

```html
<div data-easy-popup="demo">
    <p>Your content.</p>
</div>
```

Use `#demo` as the URL to open popup.

```html
<a href="#demo">Open popup 1</a>
```

## Methods

```js
// init with JS
EasyPopup.init('.popup', {
    id: 'popup-id', // required
    title: 'Demo 2', // title on mobile layout
    hasMobileLayout: false, // toggle mobile layout, false by default
    triggerSelector: '.open-demo-2', // set custom triggers
    closeButtonHTML: '<span>Click to close</span>', // set custom HTML for close button
    outerClass: 'my-popup', // custom class for popup
    onOpen: data => {
    },
    onClose: data => {
    },
});

// get popup
const myPopup = EasyPopup.get('popup-id');

// control popup
myPopup.open();
myPopup.close();
myPopup.toggle();
```

### Ignore click

Add class `easy-popup-ignore-click` to ignore click event. By default, all elements will have click event assigned by
Easy Popup. However, sometimes HTML that appends later via JS could lead to be treated as placed outside popup, which
leads to popup closing when that element clicked.

```html

<button class="easy-popup-ignore-click">My button</button>
```

## Deployment

Install gulp

```shell
npm install
```

And start a dev server

```shell
gulp serve
```